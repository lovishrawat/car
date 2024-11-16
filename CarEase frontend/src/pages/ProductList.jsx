import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input'; // Adjust the import path as needed
import { Card, CardHeader, CardContent } from '../components/ui/card'; // Adjust the import path as needed

function ProductList() {
  const products = [
    {
      id: '1',
      title: 'Product 1',
      description: 'Description of Product 1',
      imageUrl: 'https://imgs.search.brave.com/a-VDToLkJ6dBfXuXhz8yhf26FfGtdRGfWL4M0Mpy0eI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/OTYxMDMwMS9waG90/by9nZW5lcmljLW1v/ZGVybi1jYXItaW4t/ZnJvbnQtb2YtY29u/Y3JldGUtd2FsbC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/MmJxUFNjRy1xdkll/QW0yOF83SWRqcklr/c1dLMS1kd3gtcDNC/eVV3MXBiaz0',
    },
    {
      id: '2',
      title: 'Product 2',
      description: 'Description of Product 2',
      imageUrl: 'https://imgs.search.brave.com/6J9msRWBpsb5c2XWMjg7WwO3pZVv2Pjk9ibcsfoafJo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/NzA4NjU2Ny9waG90/by9nZW5lcmljLW1v/ZGVybi1zdXYtY2Fy/LWluLWNvbmNyZXRl/LWdhcmFnZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZWg2/RUE0ZzQ2MnpmVmc1/YTNpUHdNc2JObFRH/WnFZaFpGVWhjTG9h/TERTcz0',
    },
    {
      id: '3',
      title: 'Product 3',
      description: 'Description of Product 3',
      imageUrl: 'https://imgs.search.brave.com/3hPPva68vGVs7dRC5cgdnfS6ATL7vkaGBajCQ37y51s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzU3LzY3LzA4/LzM2MF9GXzg1NzY3/MDgwMV9VRXZiZEtn/R2lXeDJOVmNJZmVJ/QmRsSVphb2VxZ29l/Yi5qcGc',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No products found</p>
          <Link to="/products/create" className="text-blue-500 hover:text-blue-700">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <h3 className="font-bold">{product.title}</h3>
                </CardHeader>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
