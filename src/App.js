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
        <Route
          path="/order/canceled/:orderId"
          element={<CanceledOrderDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
