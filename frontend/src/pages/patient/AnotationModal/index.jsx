import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';

import styles from "./styles.module.css";

export const AnotationModal = ({ id, token }) => {
  const [formData, setFormData] = useState({
    data: "",
    description: ""
  });
  const [appointments, setAppointments] = useState([{}]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await api.get(`/patients/${id}/appointments`, { headers: { 'Authorization': `Bearer ${token}` } })
      setAppointments(response.data)
    }
    fetchAppointments()
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post(`/patients/${id}/appointments`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    setFormData({
      data: "",
      description: ""
    })
  };

  console.log(formData)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.content}>
        <Dialog.Title>Anotacoes de atendimento</Dialog.Title>
        <form className={styles.form_user} onSubmit={handleSubmit}>
          <label htmlFor="data">
            Data da Consulta
            <select name="data" id="data" onChange={handleChange}>
              {appointments.map(appointment => <option value="01/01/2025" key={appointment.uuid}>{appointment.startTime}</option>)}
            </select>
          </label>
          <textarea name="description" id="description" rows="4" cols="50" onChange={handleChange} />

          <button type="submit">Cadastrar</button>
        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}