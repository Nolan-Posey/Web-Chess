// Exercise from youtube video
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const onClicked = (text: ReactNode) => {
  console.log(text);
};

function MyButton({ children }: Props) {
  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => onClicked(children)}>
          {children}
        </button>
      </div>
    </>
  );
}

export default MyButton;
