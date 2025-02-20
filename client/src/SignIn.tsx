import { FormEvent } from "react";
import { User } from "./App";
import axios from "axios";

interface SignInProps {
  setUser: (user: User) => void;
}
const SignIn = ({ setUser }: SignInProps) => {
  // TODO: remove this function if not needed on other part
  async function isAuthenticated() {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        withCredentials: true,
      });
      console.log("Auth:");
      console.log(response.data);
      const data = response.data;
      if (data.user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
    }
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log("Submitting payload:", formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/sign-in",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" name="username" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
