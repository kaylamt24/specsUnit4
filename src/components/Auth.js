import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
const alert = require('alert-node');

const Auth = () => {
  //this is a form for registering and logging in users. AuthContext is a state object to store token, expiration time and userId information after successful authentication.

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    }

    console.log("submitHandler called - this is the components/auth.js");

    axios
    .post(register ? `/register` : `/login`, body)
    .then((res) => {
        // console.log(res.data)



        console.log("after initial login");

        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        console.log("after authCTX login");
        console.log(res.data);
        // console.log(authCtx)
        // console.log(authCtx.login)
      })
      //Cleares the username and password fields if there is an error in authentication.
      .catch((err) => {
        setUsername("");
        setPassword("");
        console.log(err, "this is at the catch");
      });
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text" //this shows the text
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />

        <input
          type='password'
        //   "password" //this puts the dots so you cannot see the password
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />

        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
