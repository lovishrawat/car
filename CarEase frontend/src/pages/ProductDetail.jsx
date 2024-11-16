import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';

function ProductDetail({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product from the products array
  const product = products?.find((p) => p.id === id);

  // Initialize form data state after product is found
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  // Update form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
      });
    }
  }, [product]);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!Array.isArray(products)) {
      console.error('Products is not an array');
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === id
        ? {
            ...p,
            ...formData
          }
        : p
    );

    setProducts(updatedProducts);
    setEditing(false);
  };

  // Handle product deletion
  const handleDelete = () => {
    if (!Array.isArray(products)) {
      console.error('Products is not an array');
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      navigate('/');
    }
  };

  // Loading state
  if (!products) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          Loading...
        </CardContent>
      </Card>
    );
  }

  // Not found state
  if (!product) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          Product not found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      {editing ? (
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">Title</label>
              <Input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 font-medium">Description</label>
              <textarea
                id="description"
                required
                rows="4"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block mb-2 font-medium">Image URL</label>
              <Input
                id="imageUrl"
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </CardContent>
      ) : (
        <>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <CardHeader>
            <h2 className="text-2xl font-bold">{product.title}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}

// Add prop types validation
ProductDetail.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  setProducts: PropTypes.func.isRequired,
};

// Add default props
ProductDetail.defaultProps = {
  products: [],
};

export default ProductDetail;