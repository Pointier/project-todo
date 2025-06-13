import styles from "./App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Calendar from "./calendar/Calendar";
import SignUp from "./sign/SignUp";
import SignIn from "./sign/SignIn";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { useState } from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);

  // TODO: add custom font later on

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
        </>
      ),
      children: [
        { index: true, element: <Calendar day={day} setDay={setDay} /> },
        { path: "sign-up", element: <SignUp /> },
        { path: "sign-in", element: <SignIn /> },
      ],
    },
  ]);
  return (
    <div className={styles.app}>
      <ThemeProvider>
        <AuthProvider>
          <TasksProvider>
            <RouterProvider router={router} />
          </TasksProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
