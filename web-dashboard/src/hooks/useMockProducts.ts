import { useState, useEffect } from 'react';
import { ProductDummy } from '@/types/product';
import { productServiceMock } from '@/services/mock/products';

export const useMockProducts = () => {
  const [products, setProducts] = useState<ProductDummy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await productServiceMock.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch mock products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { products, loading, error, refetch: fetch };
};

export default useMockProducts;
