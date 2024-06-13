import { useState } from "react";
import DismissibleAlert from "./components/DismissibleAlert";
import ShowAlertButton from "./components/ShowAlertButton";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <>
      <div>
        {alertVisible === true && (
          <DismissibleAlert
            onClose={() => setAlertVisibility(false)}
          ></DismissibleAlert>
        )}
        <ShowAlertButton onClick={() => setAlertVisibility(!alertVisible)}>
          Show Alert
        </ShowAlertButton>
      </div>
    </>
  );
}

export default App;
