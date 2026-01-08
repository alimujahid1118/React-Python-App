import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { useState } from "react";

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
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login Log_in={Log_in} />} />
        <Route
          path="/profile"
          element={
            <Profile
              isLoggedIn={isLoggedIn}
              profile_img={profile_img}
              setProfile_img={setProfile_img}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
