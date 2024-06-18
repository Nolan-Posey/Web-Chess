import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/navigation/NavigationBar";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ChessboardPage from "./pages/ChessboardPage";
import { AuthProvider } from "./components/contexts/AuthContext";
import Login from "./components/login_signup/Login";
import Signup from "./components/login_signup/Signup";
import ProtectedRoute from "./components/navigation/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Chessboard"
              element={
                <ProtectedRoute>
                  <ChessboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AboutUs"
              element={
                <ProtectedRoute>
                  <AboutUsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
