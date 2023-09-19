import './styles.css'
//as props são recebidas, ela que passa pra dentro dos componentes
//as props aqui são o searchValue e handleChange, passando pra dentro
// do componente InputText
export const InputText = ({searchValue, handleChange}) => {
  return (
    <input
      className='input-text'
      onChange={handleChange}
      value={searchValue}
      type="search" 
      placeholder='type you search'
    />
  )
}