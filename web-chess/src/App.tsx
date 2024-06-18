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

function App() {
  return (
    <>
      <div>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" Component={HomePage} />
            <Route path="/Chessboard" Component={ChessboardPage} />
            <Route path="/AboutUs" Component={AboutUsPage} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
