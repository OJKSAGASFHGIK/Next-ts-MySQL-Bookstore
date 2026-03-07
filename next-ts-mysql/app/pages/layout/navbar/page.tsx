import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-2xl font-bold tracking-wider hover:text-indigo-100 transition">
              BookStore
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-indigo-100 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
              Home
            </Link>
            <Link href="/pages/add" className="text-indigo-100 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
