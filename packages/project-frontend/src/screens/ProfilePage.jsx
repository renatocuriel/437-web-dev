import { useState, useEffect } from "react";
import {
    fetchUserData,
    updateUsername,
    updateBio,
    uploadProfilePicture,
    fetchProfilePicture,
} from "../providers/UserProvider";

const ProfilePage = ({ logout }) => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("/userProfilePics/default_profile.jpg");
    const [newUsername, setNewUsername] = useState("");
    const [newBio, setNewBio] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            const user = await fetchUserData();
            if (user) {
                setUsername(user.username);
                setBio(user.bio || "");
                setNewUsername(user.username);
                setNewBio(user.bio || "");
            }

            const profileImage = await fetchProfilePicture();
            setProfilePic(profileImage);
        };

        loadUserData();
    }, []);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleUsernameSubmit = async () => {
        if (!newUsername || newUsername === username) return;
        const result = await updateUsername(newUsername);
        if (result) {
            setMessage("Username updated successfully. You will be logged out and need to log in with your new username.");
            setTimeout(() => {
                logout(); // 🔹 Logs user out after username change
            }, 2000);
        }
    };

    const handleBioChange = (e) => {
        setNewBio(e.target.value);
    };

    const handleBioSubmit = async () => {
        if (!newBio || newBio === bio) return;
        const result = await updateBio(newBio);
        if (result) {
            setBio(newBio);
            setMessage("Bio updated successfully.");
        }
    };

    const handleProfilePicUpload = async (event) => {
        if (!event.target.files?.length) return;
        const file = event.target.files[0];
        const result = await uploadProfilePicture(file);
        if (result) {
            setProfilePic(result.imageUrl);
            setMessage("Profile picture updated.");
        }
        const newProfilePic = await fetchProfilePicture();
        setProfilePic(newProfilePic);
    };

    return (
        <div className="mt-6 md:mt-0 flex flex-col items-center">
            <h1 className="hidden text-2xl font-bold text-center mb-6">Profile</h1>

            {/* Profile Section */}
            <div className="bg-container p-6 w-full max-w-lg border-highlight rounded-lg">
                <div className="flex flex-col items-center mb-6">
                    {/* Profile Picture Upload */}
                    <label className="relative cursor-pointer">
                        <img 
                            src={profilePic} 
                            alt="Profile Picture" 
                            className="w-32 h-40 shadow-md border-highlight object-contain"
                        />
                        <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            accept="image/*"
                            onChange={handleProfilePicUpload} 
                        />
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Click to change profile picture</p>
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label className="text-lg font-semibold">Username</label>
                    <input 
                        type="text"
                        value={newUsername}
                        onChange={handleUsernameChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
                    />
                    <button
                        onClick={handleUsernameSubmit}
                        className="btn-primary w-full mt-2"
                    >
                        Save Username
                    </button>
                    <p className="text-sm text-red-500 mt-2">
                        Changing your username will log you out. You will need to log in again with the new username.
                    </p>
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <label className="text-lg font-semibold">Bio</label>
                    <textarea 
                        value={newBio}
                        onChange={handleBioChange}
                        className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
                    />
                    <button
                        onClick={handleBioSubmit}
                        className="btn-primary w-full mt-2"
                    >
                        Save Bio
                    </button>
                </div>

                {/* Save Confirmation */}
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

export default ProfilePage;
