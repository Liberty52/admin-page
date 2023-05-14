import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import Orders from "./screen/orders/Orders";
import OrderDetail from "./screen/orders/OrderDetail";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/question"} element={<Question />} />
        <Route path={"/orders"} element={<Orders />} />
        <Route path={"/orders/order"} element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
