import * as Dialog from '@radix-ui/react-dialog';


import styles from "./styles.module.css";
import { api } from '../../lib/axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from "react-router-dom";
import { UpdateModal } from './UpdateModal';
import { PersonalInfo } from './PersonalInfo';
import { AnotationModal } from './AnotationModal';

export const Patient = () => {
  const { id } = useParams();
  const { token } = useAuth();

  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/patients/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
      setPaciente(response.data);
    }
    fetchData()
  }, [token, id]);


  const handleDeletePatient = async () => {
    const response = await api.delete(`/patients/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
    if (response.status === 204) {
      alert("paciente excluido")
    }
  }

  return (
    <main className={styles.wrapper}>


      <section className={styles.container}>

        <header className={styles.container_header}>
          <h2>{paciente.name}</h2>
          <div className={styles.container_header_options}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button>Editar cadastro</button>
              </Dialog.Trigger>
              <UpdateModal id={id} token={token} patient={{ ...paciente }} />
            </Dialog.Root>
            <button onClick={handleDeletePatient}>Excluir cadastro</button>
          </div>
        </header>

        <div className={styles.wrapper_list}>
          <PersonalInfo weight={paciente.weight} height={paciente.height} birthDate={paciente.birthDate} gender={paciente.gender} phone={paciente.phone} />

          <Dialog.Root>

            <Dialog.Trigger asChild>
              <button>Inserir anotacao</button>
            </Dialog.Trigger>

            <AnotationModal id={id} token={token} />

          </Dialog.Root>


          <table className={styles.list}>
            <thead>
              <tr>
                <th className={styles.list_item}>Data da consulta</th>
                <th className={styles.list_item}>Atendimento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.list_item}>Douglas</td>
                <td className={styles.list_item}>05/08/1991</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}