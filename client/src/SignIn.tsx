import { FormEvent } from "react";
import { User } from "./App";
import axios from "axios";

interface SignInProps {
  setUser: (user: User) => void;
}
const SignIn = ({ setUser }: SignInProps) => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData);

    const response = await axios.post(
      "http://localhost:3000/sign-in",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // TODO: Improve the security to only get the name or use jwt ?
    console.log(response.data.user);
    setUser(response.data.user);
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
