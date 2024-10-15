import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../reducer/cartSlice';
import { useEffect } from 'react';
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
  const dispatch = useDispatch();

  return (
    <div className='sticky min-h-60 max-w-60 top-0 left-0 z-20'>
      <div className='bg-green-300 h-60  rounded-md top-0 left-0 z-10 shadow-sm sticky p-3 opacity-70'></div>
      <div className='absolute top-2 z-20 left-2 p-2 flex flex-col  items-center '>
        <h2 className=' text-white bg-green-300 font-medium px-3 border border-green-700 rounded-sm'>
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className='text-wrap size-40'
            >
              <h3 className='font-medium'>{item.title}</h3>
              <p>Price: {item.price}</p>
              <p>
                Quantity:
                <button
                  className='bg-red-500 text-white font-medium p-2 m-2  rounded-full'
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                >
                  -
                </button>
                {item.quantity}
                <button
                  className='bg-green-500 text-white font-medium p-2 m-2  rounded-full'
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </p>
              <p>Total: {item.price * item.quantity}</p>
              <button
                className='bg-red-500 text-white px-2 rounded-sm'
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
