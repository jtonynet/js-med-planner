import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export const Login = () => {
  const navigate = useNavigate()
  const { sigin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sigin(formData);
    navigate(`/patients`);
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit} >
        <label className={styles.input} htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label className={styles.input} htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">SigIn</button>
      </form>
    </section>
  )
}