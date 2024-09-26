import { useContext, useEffect, useState } from "react";


import { AuthContext } from "../../context/authContext";
import { api } from "../../lib/axios";


import styles from "./styles.module.css";


export const Patients = () => {
  const { token } = useContext(AuthContext);
  const [pacientes, setPacientes] = useState([]);


  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await api.get(`/patients`, { headers: { 'Authorization': `Bearer ${token}` } })
        setPacientes(response.data);
      }
      fetchData()

    }

  }, [token]);




  return (
    <section className={styles.container}>
      <header className={styles.container_header}>
        <h2>Pacientes</h2>
        <button>Novo Paciente</button>
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
              <tr key={paciente.uuid}>
                <td className={styles.list_item}>{paciente.name}</td>
                <td className={styles.list_item}>{paciente.birthDate}</td>
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