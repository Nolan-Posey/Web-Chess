// Extra component used to demonstrate DismissibleAlert component
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const onClicked = (text: ReactNode) => {
  console.log(text);
};

function ShowAlertButton({ children, onClick }: Props) {
  const [selectedColor, setSelectedColor] = useState("success");
  return (
    <>
      <div>
        <button
          className={"btn btn-" + selectedColor}
          onClick={() => {
            onClicked(children);
            onClick();
            selectedColor === "success"
              ? setSelectedColor("danger")
              : setSelectedColor("success");
          }}
        >
          {children}
        </button>
      </div>
    </>
  );
}

export default ShowAlertButton;
