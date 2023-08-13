import React from "react";
import { useFirebase } from "../FirebaseContext";

const Home = () => {
  const { user, signOut } = useFirebase();

  if (!user) {
    return null;
  }
  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Home;
