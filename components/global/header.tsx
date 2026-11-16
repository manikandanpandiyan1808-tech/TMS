import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    titleNode?: React.ReactNode;
    isAdmin?: boolean;
    children?: React.ReactNode;
    /** Optional classes for the inner content row (e.g. to match a page container). */
    contentClassName?: string;
    /* Button props */
    actionLabel?: string;
    onActionClick?: () => void;
    actionVariant?: React.ComponentProps<typeof Button>["variant"];
    actionIcon?: React.ReactNode;
}

export default function Header({
    title,
    titleNode,
    isAdmin = false,
    className,
    contentClassName,
    children,
    actionLabel,
    onActionClick,
    actionVariant = "default",
    actionIcon,
    ...props
}: HeaderProps) {
    return (
        <header
            className={cn(
                "flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4",
                className
            )}
            {...props}
        >
            <div className={cn("flex w-full items-center justify-between gap-2", contentClassName)}>
                <div className="flex shrink-0 items-center">
                    {isAdmin && (
                        <>
                            <SidebarTrigger className="ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-3 h-5 data-[orientation=vertical]:h-5"
                            />
                        </>
                    )}

                    {titleNode ? (
                        <div className="flex items-center gap-1 text-xl font-semibold text-slate-800 dark:text-slate-100">
                            {titleNode}
                        </div>
                    ) : title ? (
                        <h1 className="flex items-center text-lg font-semibold animate-fade-in-down">
                            {title}
                        </h1>
                    ) : null}
                </div>

                {/* Top Right Actions */}
                <div className="flex items-center gap-2">
                    {children}

                    {/* Top-right Button (renders only if an actionLabel is passed) */}
                    {actionLabel && (
                        <Button
                            variant={actionVariant}
                            size="sm"
                            onClick={onActionClick}
                            className="flex items-center bg-(--primary-button) gap-1.5"             >
                            {actionIcon}
                            {actionLabel}
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}