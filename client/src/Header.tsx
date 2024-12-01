import styles from "./Header.module.css";
import { User } from "./App";

interface HeaderProps {
  user: User | null; // Assume user might be null or undefined
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className={styles.header}>
      {!user ? (
        <>
          <a href="/task-manager/sign-up">Sign up!</a>
          <a href="/task-manager/sign-in">Sign in!</a>
        </>
      ) : (
        <div>You are connected as: {user.name}</div>
      )}
    </div>
  );
};

export default Header;
