import { Link, Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export function NavBar({ isLoggedIn, Log_out, profile_img }) {
  const [navItem, setNavItem] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setNavItem(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Outlet />
      <div className="fixed top-0 right-0 left-0">
        <div className="absolute z-[100] flex w-[100%] bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 pt-4 pb-4">
          <div className="flex ml-[60px]">
            <Link to="/">
              <i className="fi fi-brands-gitlab text-4xl text-white"></i>
            </Link>
          </div>
          <div className="absolute flex right-0 mr-[60px] text-white">
            <div className=" flex space-x-8 items-center">
              {isLoggedIn ? (
                <div ref={containerRef} className="flex flex-col">
                  <button onClick={() => setNavItem(!navItem)}>
                    <img
                      src={profile_img ? profile_img : "profile-pic.webp"}
                      className="w-10 h-10 rounded-full"
                    />
                  </button>
                  {navItem && (
                    <div className="absolute z-[101] bg-white w-[145px] h-[110px] right-0 mt-[40px] mr-[15px] rounded-md border-[2px] border-t-0 border-black">
                      <ul className="absolute">
                        <div className="text-gray-600 relative flex mt-1 space-x-2 left-4 hover:text-yellow-400">
                          <i className="fi fi-rr-user mt-[2px] "></i>
                          <Link to="/profile">
                            <li>Profile</li>
                          </Link>
                        </div>
                        <p className="h-[1px] flex bg-gray-500 mt-1 w-[130px] ml-1"></p>
                        <div className="text-gray-600 relative flex mt-1 space-x-2 left-4 hover:text-yellow-400">
                          <i className="fi fi-rr-settings mt-[2px]"></i>
                          <Link to="/settings">
                            <li>Settings</li>
                          </Link>
                        </div>
                        <p className="h-[1px] flex bg-gray-400 mt-1 w-[130px] ml-1"></p>
                        <div className="text-gray-600 relative flex mt-1 space-x-2 left-4 hover:text-yellow-400">
                          <i className="fi fi-rr-exit"></i>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              Log_out();
                              setNavItem(false);
                              Swal.fire({
                                title: "Success",
                                text: "You have been logged out.",
                                icon: "success",
                                confirmButtonText: "OK",
                                position: "center",
                              });
                            }}
                            className="hover:cursor-pointer"
                          >
                            Logout
                          </button>
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-8 items-center mt-2">
                  <Link to="/login">
                    <button className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-500 pb-2 hover:text-gray-500">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-500 pb-2 hover:text-gray-500">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
