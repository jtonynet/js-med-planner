import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { api } from "../../../lib/axios";

import * as Dialog from '@radix-ui/react-dialog';

export const UpdateModal = ({ id, token, patient }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    height: "",
    weight: ""
  });

  useEffect(() => {
    setFormData({
      name: patient.name,
      phone: patient.phone,
      email: patient.email,
      birthDate: patient.birthDate,
      gender: patient.gender,
      height: patient.height,
      weight: patient.weight
    })
  }, [patient])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.patch(`/patients/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });


  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.content}>
        <Dialog.Title>Atualizar Paciente</Dialog.Title>
        <form className={styles.form} onSubmit={handleSubmit}>

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
            <input onChange={handleChange} type="text" name="height" id="height" value={formData.height} />
          </label>

          <label className={styles.form_field} htmlFor="weight">
            Peso:
            <input onChange={handleChange} type="text" name="weight" id="weight" value={formData.weight} />
          </label>
          <button type="submit">Atualizar</button>
        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}