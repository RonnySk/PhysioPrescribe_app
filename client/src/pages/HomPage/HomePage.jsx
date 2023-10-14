import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
  const { user } = useContext(AuthContext);

  console.log(user);

  return <div>HomePage</div>;
}

export default HomePage;
