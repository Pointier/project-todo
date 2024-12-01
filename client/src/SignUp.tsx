import { FormEvent } from "react";
import axios from "axios";

const SignUp = () => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await axios.post(
        "http://localhost:3000/sign-up",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
