// src/app/(public)/page.tsx

import Header from "@/components/global/header"

export default function HomePage() {
  return (<>
 <Header
      title="dashboard"/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      <h1>Welcome to the Turf Booking System</h1>
      <p>Book your favorite turf online!</p>
      {/* Add your buttons, hero section, and other components here */}
    </main>
    </>
  );
  
}