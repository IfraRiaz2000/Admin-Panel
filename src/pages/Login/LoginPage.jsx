// import React, { useState } from "react";
// import "./LoginPage.css"
// import LoginBg from "../../assets/bg.jpg"
// import logo from "../../assets/logo.png";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";


// export default function LoginPage({ setIsLoggedIn }) {

//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {

//     if (username === "admin" && password === "123456") {
//       setIsLoggedIn(true);
//       navigate("/");
//     } else {

//       setTimeout(() => {
//         alert("Incorrect Credentials");
//       }, 0);
//     }
//   }


//   return (
//     <div className="login-page-container" style={{ backgroundImage: `url(${LoginBg})` }}>
//       <div className="form-container">
//       <img src={logo} alt="" className="logo" />
//       <h1 className="adminTag">Admin Login</h1>

//       <form className="login-form">
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           placeholder="Enter your username"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//         />
//         <br />
//         <label htmlFor="password" >Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//         <br />

//         <Link to="/">
//           <button type="button" className="loginButton" onClick={handleLogin}>Login</button>
//         </Link>
//       </form>
//     </div>
//     </div>
    
//   )
// }

import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import LoginBg from "../../assets/bg.jpg";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const adminsCollection = collection(db, "admin");
        const adminsSnapshot = await getDocs(adminsCollection);
        const adminsData = adminsSnapshot.docs.map((doc) => doc.data());
        setAdmins(adminsData);
        console.log(adminsData);
      } catch (error) {
        console.error("Error fetching admin collection:", error);
        // Handle the error appropriately
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    // Match username and password with admin data
    const matchedAdmin = admins.find((admin) => admin.username === username && admin.password === password);

    if (matchedAdmin) {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setTimeout(() => {
        alert("Incorrect Credentials");
      }, 0);
    }
  };

  return (
    <div className="login-page-container" style={{ backgroundImage: `url(${LoginBg})` }}>
      <div className="form-container">
        <img src={logo} alt="" className="logo" />
        <h1 className="adminTag">Admin Login</h1>

        <form className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />

          <button type="button" className="loginButton" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}