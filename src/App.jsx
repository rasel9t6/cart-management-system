import Cart from './components/Cart';
import ProductList from './components/ProductList';
import { Provider } from 'react-redux';
import store from './reducer/store';
function App() {
  return (
    <Provider store={store}>
      <Cart />
      <ProductList />
    </Provider>
  );
}

export default App;
