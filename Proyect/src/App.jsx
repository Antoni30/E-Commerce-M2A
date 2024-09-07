import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppI from "./pages/AppPage";
import Login from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/ProfilePage.jsx";
import ProtectedRout from "./ProtectedRout.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppI />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route element={<ProtectedRout />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
