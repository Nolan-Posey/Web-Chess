import { useState } from "react";

// {items: [], heading: string} - defining the "props" that will be passed to the component.
interface ListGroupProps {
  items: string[];
  heading: string;

  //(item: string) => void
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // useState returns an array that has two elements
  // The first element is the value that will be changed
  // The second element is a function that will change the second element
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    // The empty angled brackets represent a "Fragment"
    // Fragments are used to put many html components into the same return statement
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items found.</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
