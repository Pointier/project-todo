import { FormEvent } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import { User } from "./App";

interface HeaderProps {
  setUser: (user: User) => void;
  user: User | null; // Assume user might be null or undefined
}

const Header = ({ user, setUser }: HeaderProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await axios.get("http://localhost:3000/log-out", {
      withCredentials: true,
    });
    setUser(response.data.user);
    try {
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.header}>
      <div>
        <a href="/task-manager/">Main</a>
      </div>
      {!user ? (
        <div>
          <a href="/task-manager/sign-up">Sign up!</a>
          <a href="/task-manager/sign-in">Sign in!</a>
        </div>
      ) : (
        <div>
          <div>You are connected as: {user.name}</div>
          <div>
            <form onSubmit={handleSubmit}>
              <button type="submit">Logout</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
