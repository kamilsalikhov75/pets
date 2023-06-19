import './custom-textarea.css';

function CustomTextarea({ value, setValue, placeholder }) {
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <textarea
      onChange={handleChange}
      value={value}
      type="text"
      className="textarea"
      placeholder={placeholder}
    />
  );
}
export { CustomTextarea };
