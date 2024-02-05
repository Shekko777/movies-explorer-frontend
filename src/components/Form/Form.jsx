import { Link } from 'react-router-dom';

const Form = ({ onSubmit, labelText, isDisabled, buttonText, signin, children }) => {
  return (
    <form onSubmit={onSubmit} className="form" action="#" noValidate>
      <fieldset className="form__fieldset">
        <label className="form__label">{labelText}</label>
        {children}
        <button disabled={isDisabled} className={`form__button ${isDisabled ? 'form__button_disabled' : '' } `} type="submit">{buttonText}</button>
        {signin ? (
          <p className="form__bottom-text">Уже зарегистрированны? <Link className="form__bottom-link">Войти</Link></p>
        ) : (
          <p className="form__bottom-text">Еще не зарегистрированны? <Link className="form__bottom-link">Регистрация</Link></p>
        ) }
      </fieldset>
    </form>
  )
}

export default Form;