import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Profile({ isLoggedIn, API_URL }) {
  const [profile, setProfile] = useState(null);
  const [activeSelection, setActiveSelection] = useState("profile");

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const profileImg = useRef(null);
  const userName = useRef(null);
  const userBio = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data?.detail ? null : res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [API_URL, token]);

  // Create or update profile
  const handleSave = async () => {
    const payload = {
      name: userName.current.value,
      bio: userBio.current.value,
    };

    try {
      if (profile) {
        await axios.put(`${API_URL}/auth/update-profile`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/auth/create-profile`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setProfile(payload);

      Swal.fire({
        title: "Success",
        text: profile
          ? "Profile updated successfully."
          : "Profile created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete profile
  const deleteProfile = async () => {
    try {
      await axios.delete(`${API_URL}/auth/delete-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(null);

      Swal.fire({
        title: "Deleted",
        text: "Profile deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex mt-[70px]">
      {/* Sidebar */}
      <aside className="w-1/3 px-4 md:px-0 md:w-1/5 bg-yellow-300 flex flex-col items-center py-10">
        <button
          onClick={() => setActiveSelection("profile")}
          className="font-semibold hover:text-gray-600"
        >
          Profile
        </button>
        <div className="w-3/4 h-px bg-white my-4" />
        <button
          onClick={() => setActiveSelection("friends")}
          className="font-semibold hover:text-gray-600"
        >
          Friends
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-start py-10">
        {activeSelection === "profile" && (
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6 md:p-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {profile ? "Your Profile" : "Create Profile"}
            </h2>

            {/* Existing Profile Info */}
            {profile && (
              <div className="mb-6 space-y-2">
                <div className="bg-slate-200 rounded-md px-4 py-2">
                  <strong>Name:</strong> {profile.name}
                </div>
                <div className="bg-slate-200 rounded-md px-4 py-2">
                  <strong>Bio:</strong> {profile.bio}
                </div>
              </div>
            )}

            {/* Form */}
            <div className="flex flex-col gap-5">
              {/* Profile Image */}
              <label className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="md:w-36">
                  {profile ? "Change Image:" : "Profile Image:"}
                </span>
                <input type="file" ref={profileImg} />
              </label>

              {/* Name */}
              <label className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="md:w-36">
                  {profile ? "Change Name:" : "Name:"}
                </span>
                <input
                  type="text"
                  defaultValue={profile?.name || ""}
                  ref={userName}
                  className="w-full border-2 rounded-md px-3 py-2"
                />
              </label>

              {/* Bio */}
              <label className="flex flex-col md:flex-row md:items-center gap-2">
                <span className="md:w-36">
                  {profile ? "Change Bio:" : "Bio:"}
                </span>
                <input
                  type="text"
                  defaultValue={profile?.bio || ""}
                  ref={userBio}
                  className="w-full border-2 rounded-md px-3 py-2"
                />
              </label>

              {/* Actions */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="w-full bg-slate-200 hover:bg-white hover:border-2 hover:border-black py-3 rounded-lg"
                >
                  {profile ? "Update Profile" : "Create Profile"}
                </button>

                {profile && (
                  <button
                    onClick={deleteProfile}
                    className="w-full bg-slate-200 hover:bg-white hover:border-2 hover:border-black py-3 rounded-lg"
                  >
                    Delete Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
