import { FormEvent, useEffect, useState } from "react";
import ThemeToggle from "./theme/ThemeToggle";
import { signOutWithEmail } from "../firebase/auth";
import styles from "./Header.module.css";
import { useAuth } from "./context/AuthContext";
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
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token Expiry Time:", new Date(tokenPayload.exp * 1000));
      console.log(token);
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
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default Header;
