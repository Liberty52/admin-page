import './Select.css';

export default function Select(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className='select-block'>
      <select className='select' value={props.value} onChange={handleChange}>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
