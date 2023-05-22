import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import Review from "./screen/Review";
import Order from "./screen/Order";
import OrderDetail from "./screen/orders/OrderDetail";
import CanceledOrderDetail from "./screen/orders/CanceledOrderDetail";
import "./App.css";
import Login from "./screen/login/Login";
import Customer from "./screen/Customer";
import Notice from "./screen/Notice";
import Editor from "./component/notice/Editor";
import NoticeDetail from "./component/notice/NoticeDetail";
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
        <Route path={"/order"} element={<Order />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />


        <Route path={"/notice"} element={<Notice />} />
        <Route path={"/notice/write"} element={<Editor />} />
        <Route path={"/notice/detail"} element={<NoticeDetail />} />

        <Route
          path="/order/canceled/:orderId"
          element={<CanceledOrderDetail />}
        />

        <Route path={PATH_PRODUCT} element={<Product/>}/>
        <Route path={PATH_PRODUCT_DETAIL} element={<ProductDetail/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
