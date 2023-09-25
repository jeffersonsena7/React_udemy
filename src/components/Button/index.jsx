import P from 'prop-types';
import './styles.css';

export const Button = ({ text, onClick, disabled = false }) => (
  //o evento do click
  <button disabled={disabled} className="button" onClick={onClick}>
    {text}
  </button>
);

//quando não for requerido tem que fazer o default
Button.defaultProps = {
  disabled: false,
};
////sempre lembra de colocar required quando for obrigatório usar na pagina.
Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
