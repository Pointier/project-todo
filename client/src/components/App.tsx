import styles from "./App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./MainBody";
import Calendar from "./Calendar";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "./AuthContext";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);

  const router = createBrowserRouter([
    {
      path: "/task-manager/",
      element: <Main day={day} />,
    },
    {
      path: "/calendar",
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
      <AuthProvider>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
