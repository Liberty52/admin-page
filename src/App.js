import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/question"} element={<Question />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
