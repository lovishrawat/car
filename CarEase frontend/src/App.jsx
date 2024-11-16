// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './componenets/Navbar.jsx';
import ProductList from './pages/ProductList';
import ProductCreate from './pages/ProductCreate';
import ProductDetail from './pages/ProductDetail';
import { Toaster } from 'react-hot-toast';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/sign-in/*"
                element={<SignIn routing="path" path="/sign-in" />}
              />
              <Route
                path="/sign-up/*"
                element={<SignUp routing="path" path="/sign-up" />}
              />
              <Route
                path="/"
                element={
                  <>
                    <SignedIn>
                      <ProductList />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/products/create"
                element={
                  <>
                    <SignedIn>
                      <ProductCreate />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <>
                    <SignedIn>
                      <ProductDetail />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
            </Routes>
          </main>
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;

