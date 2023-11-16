import Head from "next/head"
import Image from "next/image";
import styles from "../app/page.module.scss";

import logo from "../../public/logo.svg";
import Input from "./ui/input";

export default function Home() {
  return (
    <>
       <Head>
        <title>Sujeito Pizza</title>
       </Head>

       <div className={styles.cotainerCenter} >
        <Image src={logo} alt="Logo" />
        <Input type="text" placeholder="seu email" />
        <Input type="password"  placeholder="****"/>
       </div>
    </>
  )
}
