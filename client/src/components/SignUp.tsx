import { FormEvent } from "react";
import { signUpWithEmail } from "../firebase/auth";
import axios from "axios";

const SignUp = () => {
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await signUpWithEmail(email, password);
      console.log("User signed up successfully:", user);
      //TODO: secure this with token instead of sending uid directly ?
      const response = await axios.post("http://localhost:3000/store-user", {
        uid: user.uid,
      });
      console.log("User UID sucessfully stored in the database");
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
