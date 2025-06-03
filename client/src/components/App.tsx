import styles from "./App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Calendar from "./calendar/Calendar";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider } from "./context/TasksContext";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);

  // TODO: add custom font later on
  const router = createBrowserRouter([
    {
      path: "task-manager/",
      element: <Calendar day={day} setDay={setDay} />,
    },
    {
      path: "/task-manager/sign-up",
      element: <SignUp />,
    },
    {
      path: "/task-manager/sign-in",
      element: <SignIn />,
    },
  ]);
  return (
    <div className={styles.app}>
      <ThemeProvider>
        <AuthProvider>
          <Header />
          <TasksProvider>
            <RouterProvider router={router} />
          </TasksProvider>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
