import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 1. Destructure role along with other fields
    const { name, email, password, role } = body;

    // 2. Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required." },
        { status: 400 }
      );
    }

    // 3. Optional: Validate allowed roles
    const validRoles = ["admin", "customer"]; // Or uppercase if your Prisma enum uses ["ADMIN", "CUSTOMER"]
    if (!validRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid role specified." },
        { status: 400 }
      );
    }

    // 4. Check if user already exists BEFORE hashing (saves CPU cycles)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Save user with the role
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(), // Convert "customer" -> "CUSTOMER"
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user: { id: newUser.id, email: newUser.email, role: newUser.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP_API_ERROR:", error);
    console.error("SIGNUP_API_ERROR:", error); // <-- Look here!

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // If you don't have createdAt, remove it or add it to your schema
        createdAt: true, 
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response to match your table's expected shape
    const formattedStaff = users.map((u) => ({
      id: String(u.id),
      name: u.name ?? "Unnamed",
      email: u.email,
      role: (u.role || "customer").toLowerCase(),
      status: "active", // Default status unless you have a status column
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "N/A",
    }));

    return NextResponse.json(formattedStaff, { status: 200 });
  } catch (error) {
    console.error("GET_STAFF_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff list" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // Convert id to Number if your Prisma User model uses `id Int @id`
    const parsedId = isNaN(Number(id)) ? id : Number(id);

    await prisma.user.delete({
      where: { id: parsedId as any },
    });

    return NextResponse.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("DELETE_STAFF_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete staff member" },
      { status: 500 }
    );
  }
}