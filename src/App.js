import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./page/notFoundPage.jsx";
import MainPage from "./page/MainPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exect path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
