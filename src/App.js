import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, Checkout, ImageUpload, Products, AboutUs, Profile } from "./pages";
import { PrivateRoute, Navigation, Footer, Tutorial } from "./components";
import { FirebaseProvider } from "./FirebaseContext";
import Admin from "./pages/Admin";
const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </FirebaseProvider>
  );
};

export default App;
