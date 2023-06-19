import './custom-button.css';

function CustomButton({ text }) {
  return (
    <button type="submit" className="button">
      {text}
    </button>
  );
}
export { CustomButton };
