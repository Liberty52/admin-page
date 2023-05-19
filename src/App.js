import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import Review from "./screen/Review";
import Orders from "./screen/orders/Orders";
import OrderDetail from "./screen/orders/OrderDetail";
import "./App.css";
import Login from "./screen/login/Login";
import Customer from "./screen/Customer";
import {PATH_PRODUCT, PATH_PRODUCT_DETAIL} from "./constants/path";
import Product from "./screen/product/Product";
import ProductDetail from "./screen/product/ProductDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/question"} element={<Question />} />
        <Route path={"/review"} element={<Review />} />
        <Route path={"/customers"} element={<Customer />} />
        <Route path={"/order"} element={<Orders />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path={PATH_PRODUCT} element={<Product/>}/>
        <Route path={PATH_PRODUCT_DETAIL} element={<ProductDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
