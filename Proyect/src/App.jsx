import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppI from "./pages/AppPage";



function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppI />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
