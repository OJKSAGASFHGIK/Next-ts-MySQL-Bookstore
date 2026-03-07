export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} BookStore. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Kindly made by Greque
        </p>
      </div>
    </footer>
  );
}
