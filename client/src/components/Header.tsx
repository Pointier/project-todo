import { FormEvent, useEffect, useState } from "react";
import { signOutWithEmail } from "../firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import styles from "./Header.module.css";
import { useAuth } from "./AuthContext";
import axios from "axios";

const Header = () => {
  const { user, loading } = useAuth();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signOutWithEmail();
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async function handleClick() {
    if (user) {
      const refresh = true;
      const token = await user.getIdToken(refresh);
      try {
        const response = await axios.post(
          "http://localhost:3000/test",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
      } catch (error) {
        console.log("Error token: ", error);
      }
    }
  }
  return (
    <div className={styles.header}>
      <div>
        <a href="/task-manager/">Main</a>
      </div>
      <div>
        <a href="/task-manager/sign-up">Sign up!</a>
        <a href="/task-manager/sign-in">Sign in!</a>
      </div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Sign out!</button>
          </form>
        </div>
      </div>
      <button onClick={handleClick}>Check Token</button>
    </div>
  );
};

export default Header;
