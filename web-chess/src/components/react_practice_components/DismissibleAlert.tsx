// Dismissiable Alert example and practice
interface Props {
  onClose: () => void;
}

const DismissibleAlert = ({ onClose }: Props) => {
  return (
    <>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Dismiss me!</strong> This is my dismissible alert example
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
};

export default DismissibleAlert;
