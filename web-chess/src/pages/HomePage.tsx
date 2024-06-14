import { Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "20px",
        }}
      >
        <Button className="grid-button" href="/Chessboard">
          Chessboard
        </Button>
        <Button className="grid-button" href="/AboutUs">
          About Us
        </Button>
      </div>
    </>
  );
}

export default HomePage;
