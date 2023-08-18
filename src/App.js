import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, Checkout, ImageUpload } from "./pages";
import { PrivateRoute, Navigation, Footer } from "./components";
import { FirebaseProvider } from "./FirebaseContext";
const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </FirebaseProvider>
  );
};

export default App;
