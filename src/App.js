import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import "./App.css";
import Login from "./screen/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
          <Route path={"/login"} element={<Login />} />
        <Route path={"/question"} element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
