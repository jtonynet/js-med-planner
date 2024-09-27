import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../../lib/axios';
import { useAuth } from "../../../hooks/useAuth";
import styles from "./styles.module.css";

export const NewPatientModal = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "male",
    height: "",
    weight: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post("/patients", { ...formData, uuid: uuidv4() }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    setFormData({
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      gender: "male",
      height: "",
      weight: ""
    })
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.content}>
        <Dialog.Title>Novo Paciente</Dialog.Title>
        <form className={styles.form_user} onSubmit={handleSubmit}>

          <label className={styles.form_field} htmlFor="name" >
            Nome:
            <input onChange={handleChange} type="text" name="name" id="name" value={formData.name} />
          </label>

          <label className={styles.form_field} htmlFor="phone">
            Telefone:
            <input onChange={handleChange} type="tel" name="phone" id="phone" value={formData.phone} />
          </label>

          <label className={styles.form_field} htmlFor="email">
            Email:
            <input onChange={handleChange} type="email" name="email" id="email" value={formData.email} />
          </label>

          <label className={styles.form_field} htmlFor="birthDate">
            Data de nascimento
            <input onChange={handleChange} type="date" name="birthDate" id="birthDate" value={formData.birthDate} />
          </label>

          <label className={styles.form_field} htmlFor="gender">
            Genero
            <fieldset data-role="controlgroup">
              <label htmlFor="male">Male</label>
              <input onChange={handleChange} type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} />

              <label htmlFor="female">Female</label>
              <input onChange={handleChange} type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} />

            </fieldset>
          </label>

          <label className={styles.form_field} htmlFor="height">
            Altura:
            <input onChange={handleChange} type="text" name="height" id="height" />
          </label>

          <label className={styles.form_field} htmlFor="weight">
            Peso:
            <input onChange={handleChange} type="text" name="weight" id="weight" />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}