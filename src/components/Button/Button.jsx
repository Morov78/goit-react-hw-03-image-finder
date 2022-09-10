import css from './Button.module.css';
const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
