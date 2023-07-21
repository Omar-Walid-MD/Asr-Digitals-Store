import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router';
import NavBar from './Layout/NavBar';
import Footer from './Layout/Footer';
import CartSideBar from './Layout/CartSideBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <CartSideBar />
      <Footer />
    </div>
  );
}

export default App;
