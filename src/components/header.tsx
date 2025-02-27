import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle"; // Import ThemeToggle component

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Packages", href: "/packages" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#2B579A] text-white dark:bg-[#1E3A6D]">
      <div className="container flex h-14 items-center gap-6">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded p-1">
            <img 
              src="/images/logo.png" 
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </a>

        <nav className="mx-auto flex items-center gap-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-yellow-400"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle /> {/* This will properly toggle dark/light mode */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600 dark:hover:bg-blue-800">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
