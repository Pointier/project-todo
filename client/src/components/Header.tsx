import { FormEvent } from "react";
import ThemeToggle from "./theme/ThemeToggle";
import { signOutWithEmail } from "../firebase/auth";
import styles from "./Header.module.css";
import { useAuth } from "./context/AuthContext";
import { FaGithub } from "react-icons/fa";

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
  return (
    <div className={styles.header}>
      <div className={styles.center}>Placeholder Name</div>
      <div className={styles.right}>
        <div className={styles.utilities}>
          <a
            href="https://github.com/Pointier/project-todo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <ThemeToggle></ThemeToggle>
        </div>
        <div className={styles.authLinks}>
          {!user && (
            <>
              <a href="/task-manager/sign-up">Sign up!</a>
              <a href="/task-manager/sign-in">Sign in!</a>
            </>
          )}

          {user && (
            <div>
              <form onSubmit={handleSubmit}>
                <button type="submit">Sign out!</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
