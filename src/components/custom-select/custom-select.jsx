import './custom-select.css';

function CustomSelect({ value, setValue, options }) {
  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <select value={value} onChange={handleChange} className="select">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.ru}
        </option>
      ))}
    </select>
  );
}
export { CustomSelect };
