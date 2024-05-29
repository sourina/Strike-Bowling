import './Input.scss';

function Input({
  testId,
  label,
  type,
  customClass,
  name,
  min,
  handleChange,
  defaultValue,
  disabled,
}) {
  return (
    <section className='input'>
      <label className='input__label'>{label}</label>
      <input
        data-testid={testId}
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        name={name}
        min={min}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
