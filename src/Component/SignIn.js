import { useState, useEffect } from "react";
import "./SignIn.css";
import { NavLink, useNavigate } from "react-router-dom";

function App() {
  const history= useNavigate()
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    history("/login")
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      localStorage.setItem("users", JSON.stringify([...data, formValues]));
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Already have an account? <span><NavLink to="/login">Sign In</NavLink></span></p>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstname}</p>

          <div className="field">
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastname}</p>

          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default App;
