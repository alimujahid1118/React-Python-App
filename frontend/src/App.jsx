import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { useState } from "react";

const API_URL = "https://react-python-app-euf3.onrender.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const Log_in = (token) => {
    localStorage.setItem("access_token", token);
    setIsLoggedIn(true);
  };

  const Log_out = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
  };
  const [profile_img, setProfile_img] = useState("");

  return (
    <Routes>
      <Route
        element={
          <NavBar
            isLoggedIn={isLoggedIn}
            Log_in={Log_in}
            Log_out={Log_out}
            profile_img={profile_img}
          />
        }
      >
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} API_URL={API_URL} />}
        />
        <Route path="/signup" element={<Signup API_URL={API_URL} />} />
        <Route
          path="/login"
          element={<Login Log_in={Log_in} API_URL={API_URL} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              isLoggedIn={isLoggedIn}
              profile_img={profile_img}
              setProfile_img={setProfile_img}
              API_URL={API_URL}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
