import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export const SideBar = () => {
  return (
    <aside className={styles.menu}>
      <header>
        <h1>Prontomed</h1>
      </header>

      <section className={styles.navigation}>
        <NavLink to="/patients">Pacientes</NavLink>
        <NavLink to="/appointments">Agendamentos</NavLink>
      </section>
    </aside>
  )
}