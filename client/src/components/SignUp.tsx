import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../firebase/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const SignUp = () => {
  const navigate = useNavigate();
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Api url: ", API_URL);

    try {
      const user = await signUpWithEmail(email, password);
      console.log("User signed up successfully:", user);

      try {
        await axios.post(`${API_URL}/store-user`, { uid: user.uid });
        console.log("User UID successfully stored in the database");
        navigate("/");
      } catch (dbErr) {
        console.error("Failed to store user in DB:", dbErr);
        await user.delete();
        alert("Sign-up failed due to server error. Please try again.");
      }
    } catch (err) {
      console.error("Sign-up error:", err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
