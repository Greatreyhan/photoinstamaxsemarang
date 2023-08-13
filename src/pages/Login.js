import React, { useState } from "react";
import { useFirebase } from "../FirebaseContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, user } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  if (user) {
    return <p>Welcome, {user.email}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
