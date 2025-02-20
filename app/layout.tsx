import type React from "react"
import { Grid2X2, Calendar, Star, Package, Settings, HelpCircle, LogOut, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface SidebarLinkProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isActive?: boolean
}

function SidebarLink({ href, icon: Icon, label, isActive }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center py-4 text-white/70 hover:text-white hover:bg-blue-800/50 transition-colors",
        isActive && "bg-[#3b82f6] text-white hover:bg-[#3b82f6]",
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-20 bg-[#1e3a8a] flex flex-col">
            <button className="p-4 text-white/70 hover:text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="flex-1 flex flex-col">
              <SidebarLink href="/dashboard" icon={Grid2X2} label="Dashboard" isActive />
              <SidebarLink href="/bookings" icon={Calendar} label="Bookings" />
              <SidebarLink href="/reviews" icon={Star} label="Reviews" />
              <SidebarLink href="/packages" icon={Package} label="Packages" />
              <SidebarLink href="/settings" icon={Settings} label="Settings" />
              <SidebarLink href="/help" icon={HelpCircle} label="Help Center" />
            </div>
            <button className="flex flex-col items-center py-4 text-white/70 hover:text-white hover:bg-blue-800/50 transition-colors">
              <LogOut className="w-6 h-6" />
              <span className="text-xs mt-1">Log out</span>
            </button>
          </aside>

          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <nav className="bg-[#1e3a8a] px-4">
              <div className="h-16 flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="EVNTgarde Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>

                {/* Center Navigation */}
                <div className="flex space-x-8">
                  <Link href="/" className="text-white hover:text-white/90">
                    Home
                  </Link>
                  <Link href="/about" className="text-white hover:text-white/90">
                    About
                  </Link>
                  <Link href="/contact" className="text-white hover:text-white/90">
                    Contact
                  </Link>
                </div>

                {/* Search Bar */}
                <div className="relative w-72">
                  <Input type="search" placeholder="Search" className="pl-10 pr-4 py-2 w-full rounded-md bg-white" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
