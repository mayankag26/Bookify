import {Routes,Route} from "react-router-dom"

//Components
import MyNavbar from "./components/navbar";

//Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/login";
import ListingPage from "./pages/list";
import HomePage from "./pages/home";
import BookDetailPage from "./pages/detail";
import OrderPage from "./pages/viewOrder";
import ViewOrderDetails from "./pages/viewOrderDetail";

//CSS
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrderPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
