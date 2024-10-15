import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducer/productSlice';
import { addToCart } from '../reducer/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'failed') return <p>Error loading products.</p>;
  console.log();
  return (
    <div className='grid min-w-10 h-[500rem] md:h-[100rem] md:grid-cols-2 lg:grid-cols-4 gap-4  m-10'>
      {products.map((product) => (
        <div
          key={product.id}
          className=' flex flex-col justify-between border rounded-md border-gray-200 bg-white px-2 py-3 shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden text-wrap'
        >
          <div className='flex justify-center overflow-hidden p-3'>
            <img
              src={product.image}
              className='p-2 size-40'
            />
          </div>
          <h2 className='text-[.8rem] font-medium lg:text-[1rem]'>
            {product.title}
          </h2>
          <p className='text-green-400 font-medium'>{product.price}$</p>
          <button
            className='bg-green-400 p-2 rounded-md font-medium'
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
