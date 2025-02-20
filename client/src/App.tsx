import styles from "./App.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./MainBody";
import Calendar from "./Calendar";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export interface User {
  name: string;
}
function App() {
  const today = new Date();
  const [day, setDay] = useState<Date>(today);
  const [user, setUser] = useState<User | null>(null);
  console.log("User: ", user);

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
      // TODO: add need to have both identifier
      path: "/task-manager/sign-up",
      element: <SignUp />,
    },
    {
      path: "/task-manager/sign-in",
      element: <SignIn setUser={setUser} />,
    },
  ]);
  return (
    <div className={styles.app}>
      <Header user={user} setUser={setUser} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
