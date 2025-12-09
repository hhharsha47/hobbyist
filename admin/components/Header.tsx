import Link from "next/link";
import { Book, Home, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600"
          >
            {/* <Book className="h-6 w-6" /> */}
            <img
              src="/logo.jpeg"
              alt="Hobbyist Logo"
              className="h-8 w-auto rounded-md"
            />
            <span>Hobbyist Docs</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href="https://hobbyistdecals.in/"
            target="_blank"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Home className="h-4 w-4" />
            Main Site
          </Link>
          <div className="hidden md:flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-gray-500">
            <Search className="h-4 w-4" />
            <span>Search docs...</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
