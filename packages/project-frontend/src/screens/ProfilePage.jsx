import { useState } from "react";

const ProfilePage = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [bio, setBio] = useState("Software engineer, book lover, and AI enthusiast.");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/120"); // Default profile picture
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="mt-6 md:mt-0 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="bg-container p-6 w-full max-w-lg border-highlight rounded-lg">
        <div className="flex flex-col items-center mb-6">
          {/* Profile Picture Upload */}
          <label className="relative cursor-pointer">
            <img 
              src={profilePic} 
              alt="Profile Picture" 
              className="w-24 h-24 rounded-full shadow-md border-highlight object-cover" 
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

        {/* Username & Email */}
        <div className="mb-4">
          <label className="text-lg font-semibold">Username</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
          />
        </div>

        <div className="mb-6">
          <label className="text-lg font-semibold">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
          />
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <label className="text-lg font-semibold">Bio</label>
          <textarea 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
          />
        </div>

        {/* Password Change */}
        <h2 className="text-xl font-semibold mb-3">Change Password</h2>
        <div className="mb-4">
          <input 
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
          />
        </div>
        <div className="mb-6">
          <input 
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 border-highlight"
          />
        </div>

        {/* Save Button */}
        <button className="btn-primary w-full">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfilePage;
