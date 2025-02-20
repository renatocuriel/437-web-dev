const ProfileCard = () => {
    return (
      <div className="border-highlight p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">📖 Your Profile</h2>
        <p>Total Books: <span className="font-semibold">12</span></p>
        <p>Currently Reading: <span className="font-semibold">1</span></p>
        <p>Finished: <span className="font-semibold">8</span></p>
      </div>
    );
  };
  
  export default ProfileCard;
  