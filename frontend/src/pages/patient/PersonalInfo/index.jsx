import styles from "./styles.module.css";


export const PersonalInfo = ({ weight, height, birthDate, gender, phone }) => {
  return (
    <section className={styles.personal_data}>
      <div>
        <p>Data de nascimento: {birthDate}</p>
        <p>Sexo: {gender}</p>
        <p>Telefone: {phone}</p>
      </div>

      <div>
        <p>Altura: {height}</p>
        <p>Peso: {weight} kg</p>
      </div>
    </section>
  )
}