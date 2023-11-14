import Head from "next/head"
import Image from "next/image";
import styles from "../app/page.module.scss";

import logo from "../../public/logo.svg";

export default function Home() {
  return (
    <>
       <Head>
        <title>Sujeito Pizza</title>
       </Head>

       <div className={styles.cotainerCenter} >
        <Image src={logo} alt="Logo" />
       </div>
    </>
  )
}
