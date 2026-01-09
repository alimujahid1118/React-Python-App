import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export function Login({ Log_in, API_URL }) {
  const userName = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: userName.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = res.data.access_token;
      localStorage.setItem("access_token", token);
      Log_in(token);

      userName.current.value = "";
      password.current.value = "";
      Swal.fire({
        title: "Success!",
        text: "Logged In Successfully",
        icon: "success",
        confirmButtonText: "OK",
        position: "center",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Invalid credentials",
        icon: "error",
        confirmButtonText: "OK",
        position: "center",
      });
    }
  };

  return (
    <div className="h-screen max-w-[400px] max-h-[100px] md:w-[100%] md:max-w-[100%] md:max-h-[400px] md:items-center md:justify-center">
      <div className="flex flex-col mt-[220px] space-y-[30px] md:mt-[150px] md:flex-row md:justify-center md:items-center md:space-x-[200px]">
        <h1 className="text-6xl text-[30px] text-gray-600 text-center">
          <strong>Welcome back</strong>
        </h1>
        <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 relative px-[50px] py-[50px] w-[3/5] h-[2/5] rounded-2xl mt-10 border-b-2 border-r-2 border-gray-500">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="UserName.."
                className="px-4 py-3 rounded-xl hover:bg-slate-100"
                ref={userName}
                required
              />
              <input
                type="password"
                placeholder="Password.."
                className="px-4 py-3 rounded-xl hover:bg-slate-100"
                ref={password}
                required
              />

              <button
                type="submit"
                className="text-gray-500 bg-white py-4 rounded-xl hover:text-black hover:bg-slate-100"
              >
                Send
              </button>

              <div className="text-white text-center">
                New here?{" "}
                <Link className="underline text-gray-600" to="/signup">
                  Sign Up instead.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
