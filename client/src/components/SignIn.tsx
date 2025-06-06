import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmail } from "../firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const user = await signInWithEmail(email, password);
      console.log("Successful Sign in");
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input type="text" name="email" />
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
