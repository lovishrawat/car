// src/utils/api.js

// Initialize products in localStorage if not exists
const initializeProducts = () => {
  if (!localStorage.getItem('products')) {
    const initialProducts = [
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
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
};

// Helper functions
const getStoredProducts = () => {
  initializeProducts();
  return JSON.parse(localStorage.getItem('products')) || [];
};

const setStoredProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Simulate async behavior
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const getProducts = async () => {
  await delay();
  return getStoredProducts();
};

export const getProduct = async (id) => {
  await delay();
  const products = getStoredProducts();
  const product = products.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const createProduct = async (productData) => {
  await delay();
  const products = getStoredProducts();
  const newProduct = {
    ...productData,
    id: Date.now().toString(), // Generate a unique ID
  };
  
  const updatedProducts = [...products, newProduct];
  setStoredProducts(updatedProducts);
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  await delay();
  const products = getStoredProducts();
  const updatedProducts = products.map(product =>
    product.id === id ? { ...product, ...productData } : product
  );
  
  setStoredProducts(updatedProducts);
  return updatedProducts.find(p => p.id === id);
};

export const deleteProduct = async (id) => {
  await delay();
  const products = getStoredProducts();
  const updatedProducts = products.filter(product => product.id !== id);
  setStoredProducts(updatedProducts);
};