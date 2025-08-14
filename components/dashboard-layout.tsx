"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const role = "SUPER_ADMIN"; // This should be dynamically fetched from session or context
  // const isAdmin = role === "NORMAL_ADMIN"? true : false;
  const isSuperAdmin = role === "SUPER_ADMIN" ? true : false;

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "fa-tachometer-alt" },
    { name: "My Products", href: "/admin/products", icon: "fa-box" },
    ...(isSuperAdmin
      ? [
          {
            name: "All Products",
            href: "/admin/products/all",
            icon: "fa-boxes",
          },
          {
            name: "Pending Approval",
            href: "/admin/products/pending",
            icon: "fa-clock",
          },
        ]
      : []),
    {
      name: "Add Product",
      href: "/admin/products/add",
      icon: "fa-plus-circle",
    },
    ...(isSuperAdmin
      ? [
          {
            name: "Admin Management",
            href: "/admin/admins",
            icon: "fa-users-cog",
          },
          { name: "Activity Logs", href: "/admin/logs", icon: "fa-history" },
        ]
      : []),
    { name: "Account Settings", href: "/admin/settings", icon: "fa-cog" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile navigation */}
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Link href="/admin" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="h-8 w-auto object-contain"
                  priority
                />
                <span className="ml-2 text-lg font-bold">Cart Royal Admin</span>
              </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <i className={`far ${item.icon} mr-3`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                priority
                // className="h-8 w-auto object-contain"
              />
              <span className="ml-2 text-lg font-bold">Cart Royal Admin</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className={`far ${item.icon} mr-3`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b">
          <button
            type="button"
            className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="far fa-bars text-xl" />
          </button>

          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <div className="max-w-7xl">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {navigation.find((item) => isActive(item.href))?.name ||
                    "Dashboard"}
                </h1>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full">
                    <Avatar>
                      <AvatarFallback>{"A"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{"Admin"}</span>
                      <span className="text-xs text-gray-500">
                        {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
