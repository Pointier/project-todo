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
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);

  // TODO: add custom font later on

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <>
            <Header />
            <Outlet /> {/* renders matched child route */}
            <Footer />
          </>
        ),
        children: [
          { index: true, element: <Calendar day={day} setDay={setDay} /> },
          { path: "sign-up", element: <SignUp /> },
          { path: "sign-in", element: <SignIn /> },
        ],
      },
    ],
    { basename: "/task-manager" },
  );
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
