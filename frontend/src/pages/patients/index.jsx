import { useContext, useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { } from "module";

import { AuthContext } from "../../context/authContext";
import { api } from "../../lib/axios";


import styles from "./styles.module.css";
import { dateFormat } from "../../lib/formatter";
import { NewPatientModal } from "./NewPatientModal";
import { useNavigate } from "react-router-dom";


export const Patients = () => {
  const { token } = useContext(AuthContext);
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await api.get(`/patients`, { headers: { 'Authorization': `Bearer ${token}` } })
        setPacientes(response.data);
      }
      fetchData()

    }

  }, [token]);

  const handleClick = (uuid) => {
    navigate(`/patients/${uuid}`)
  }


  return (
    <section className={styles.container}>
      <header className={styles.container_header}>
        <h2>Pacientes</h2>

        <Dialog.Root>

          <Dialog.Trigger asChild>
            <button>Novo Paciente</button>
          </Dialog.Trigger>

          <NewPatientModal />

        </Dialog.Root>
      </header>

      <div>
        <table className={styles.list}>
          <thead>
            <tr>
              <th className={styles.list_item}>Nome</th>
              <th className={styles.list_item}>Data de Nascimento</th>
              <th className={styles.list_item}>Sexo</th>
              <th className={styles.list_item}>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr className={styles.list_item} key={paciente.uuid} onClick={() => handleClick(paciente.uuid)}>
                <td className={styles.list_item}>{paciente.name}</td>
                <td className={styles.list_item}>{dateFormat(paciente.birthDate)}</td>
                <td className={styles.list_item}>{paciente.gender === `male` ? `Masculino` : `Feminino`}</td>
                <td className={styles.list_item}>{paciente.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}