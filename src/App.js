import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, Checkout } from "./pages";
import { PrivateRoute } from "./components";
import { FirebaseProvider } from "./FirebaseContext";
const App = () => {
  return (
    <FirebaseProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </Router>
    </FirebaseProvider>
  );
};

export default App;
