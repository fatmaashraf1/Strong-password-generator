import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(0);
  const [isLogin, setLogin] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // async function getUsers() {
  //   const response = await axios.get("https://dummyjson.com/users");
  //   setUsers(response.data.users);
  //   console.log(response.data.users);
  // }
  // useEffect(() => {
  //   getUsers();
  // }, []);

  async function getToken() {
    const response = await axios.post("https://dummyjson.com/auth/login", {
      username: username,
      password: password,
    });
    console.log(response.data.token);
    setToken(response.data.token);
  }

  async function authorizeToken() {
    axios
      .request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: `https://dummyjson.com/auth/users`,
      })
      .then((response) => {
        console.log(response.status);
        setStatus(response.status);
      });
  }

  const handleLogin = () => {
    if (!username || !password) return;
    getToken();
    authorizeToken();

    if (status != "200") return;
    else setLogin(true);
  };

  useEffect(() => {
    if (status == "200") {
      window.location.href = "https://180webtraining.netlify.app";
    }
  }, status);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>Dashboard Login</h2>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <label>Username:</label>
        <input
          style={{
            marginLeft: "10px",
            height: "35px",
          }}
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          style={{
            marginLeft: "10px",
            height: "35px",
          }}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
