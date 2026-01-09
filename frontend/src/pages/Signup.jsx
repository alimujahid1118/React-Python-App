import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export function Signup({ API_URL }) {
  const userName = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value.length > 72) {
      alert("Password too long (max 72 characters)");
      return;
    }

    const formData = {
      username: userName.current.value,
      password: password.current.value,
    };

    try {
      await axios.post(`${API_URL}/auth/signup`, formData);
      userName.current.value = "";
      password.current.value = "";
      Swal.fire({
        title: "Success!",
        text: "User created successfully",
        icon: "success",
        confirmButtonText: "OK",
        position: "center",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "User already Exists",
        icon: "error",
        confirmButtonText: "OK",
        position: "center",
      });
    }
  };

  return (
    <div className="h-screen max-w-[400px] max-h-[100px] md:h-screen md:w-[100%] md:max-h-[700px] md:flex md:items-center md:justify-center">
      <div className="flex flex-col mt-[220px] space-y-[30px] md:flex md:justify-center md:items-center md:space-x-[200px]">
        <h1 className="text-6xl text-[30px] text-gray-600 text-center">
          <strong>Join us today!</strong>
        </h1>
        <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 relative mt-10 z-0 px-[50px] py-[50px] w-[3/5] h-[2/5] rounded-2xl border-b-2 border-r-2 border-gray-500">
          <div>
            <form onSubmit={handleSubmit} className=" flex flex-col space-y-5">
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
                Have an account?{" "}
                <Link className="underline text-gray-600" to="/login">
                  Log In instead.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
