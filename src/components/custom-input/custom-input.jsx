import './custom-input.css';

function CustomInput({ value, setValue, placeholder, type = 'text' }) {
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <input
      onChange={handleChange}
      value={value}
      type={type}
      className="input"
      placeholder={placeholder}
    />
  );
}
export { CustomInput };
