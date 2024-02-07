import './Form.css';  

const Form = ({ onSubmit, buttonText, children }) => {
  return (
    <form onSubmit={onSubmit} className="form" action="#" noValidate>
      <fieldset className="form__fieldset">
        {children}
      </fieldset>
    </form>
  )
}

export default Form;