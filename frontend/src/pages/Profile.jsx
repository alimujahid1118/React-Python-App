import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Profile({ isLoggedIn }) {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("access_token");

  const profileImg = useRef(null);
  const user_name = useRef(null);
  const user_bio = useRef(null);

  const [activeSelection, setActiveSelection] = useState("profile");
  const navigate = useNavigate();

  const show_Profile = () => setActiveSelection("profile");
  const show_Friends = () => setActiveSelection("friends");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/auth/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data?.detail) {
          setProfile(res.data);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [token]);

  // Create or Update profile
  const handleSave = async () => {
    const payload = {
      name: user_name.current.value,
      bio: user_bio.current.value,
    };

    try {
      if (profile) {
        await axios.put("http://127.0.0.1:8000/auth/update-profile", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonText: "OK",
          position: "center",
        });
      } else {
        await axios.post("http://127.0.0.1:8000/auth/create-profile", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setProfile(payload);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/auth/delete-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-slate-200">
      {/* Sidebar */}
      <div className="flex justify-end w-[20%] h-[100vh]">
        <div className="bg-yellow-300 text-white font-bold flex flex-col text-center h-[85%] w-[80%] mt-[80px] space-y-6 py-8">
          <p className="h-[1px] flex ml-[8px] bg-white w-[90%]"></p>
          <button onClick={show_Profile} className="hover:text-gray-500">
            Profile
          </button>
          <p className="h-[1px] flex ml-[8px] bg-white w-[90%]"></p>
          <button onClick={show_Friends} className="hover:text-gray-500">
            Friends
          </button>
          <p className="h-[1px] flex ml-[8px] bg-white w-[90%]"></p>
        </div>
      </div>

      {/* Content */}
      <div className="justify-start w-[80%] h-[100vh]">
        <div className="flex bg-white w-[95%] h-[85%] mt-[80px]">
          {activeSelection === "profile" && (
            <div className="flex flex-col p-[60px] text-2xl space-y-8">
              {profile && (
                <>
                  <div>Name: {profile.name}</div>
                  <div>Bio: {profile.bio}</div>
                </>
              )}

              <div className="flex flex-col space-y-4">
                <label className="flex py-2 rounded-lg space-x-2">
                  <span>
                    {profile ? "Change Profile Img:" : "Create Profile Img:"}
                  </span>
                  <input
                    type="file"
                    className="rounded-sm max-w-[400px]"
                    ref={profileImg}
                  />
                </label>

                <label className="flex items-center py-2 rounded-lg">
                  {profile ? "Change Name:" : "Create Name:"}
                  <input
                    type="text"
                    defaultValue={profile?.name || ""}
                    className="ml-1 rounded-sm border-[2px] py-2"
                    ref={user_name}
                  />
                </label>

                <label className="flex items-center py-2 rounded-lg">
                  {profile ? "Change Bio:" : "Create Bio:"}
                  <input
                    type="text"
                    defaultValue={profile?.bio || ""}
                    className="ml-8 rounded-sm border-[2px] py-2"
                    ref={user_bio}
                  />
                </label>

                <div className="flex">
                  <button
                    onClick={handleSave}
                    className="bg-slate-200 w-[70%] hover:bg-white hover:border-[2px] hover:border-black flex items-center justify-center py-2 rounded-lg"
                  >
                    Update Profile
                  </button>

                  {profile && (
                    <button
                      onClick={deleteProfile}
                      className="bg-slate-200 w-[70%] ml-[10px] hover:bg-white hover:border-[2px] hover:border-black flex items-center justify-center py-2 rounded-lg"
                    >
                      Delete Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
