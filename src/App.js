import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./screen/Main";
import Question from "./screen/Question";
import Review from "./screen/Review";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/question"} element={<Question />} />
        <Route path={"/review"} element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
