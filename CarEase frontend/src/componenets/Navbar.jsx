import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Car App
          </Link>
          {isSignedIn && (
            <div className="flex items-center space-x-4">
              <Link
                to="/products/create"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Product
              </Link>
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;