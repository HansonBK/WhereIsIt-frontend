import { useState } from "react";
import api from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <>
      <div>
        <form action="LoginForm" onSubmit={submit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" color="red">
            submit
          </button>
        </form>
      </div>
    </>
  );
}
export default Register;
