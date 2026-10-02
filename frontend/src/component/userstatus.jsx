import { useState } from "react";

function UserStatus() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="user-status">

            {isLoggedIn ? (
                <div>
                    <h2>Welcome, Alex! 👋</h2>

                    <button onClick={() => setIsLoggedIn(false)}>
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <h2>You are not logged in.</h2>

                    <button onClick={() => setIsLoggedIn(true)}>
                        Login
                    </button>
                </div>
            )}

        </div>
    );
}

export default UserStatus;