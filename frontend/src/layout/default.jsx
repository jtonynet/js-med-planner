import { SideBar } from "./../components/SideBar";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

export const DefaultLayout = () => {
  return (
    <main className={styles.wrapper}>
      <SideBar />
      <section className={styles.container}>
        <Outlet />
      </section >
    </main>
  )
}