export function AccountSettings({ userName, setUserName, onLogout }) {
    return (
        <>
            <h2>Account settings</h2>
            <label>
                Username:
                <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                />
            </label>
            <p><i>Changes are auto-saved.</i></p>
            <button onClick={onLogout}>Log Out</button>
        </>
    );
}
