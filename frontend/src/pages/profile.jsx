import { useAuth } from "../context/authocontext";

function Profile() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div>
                <h1>Profile</h1>
                <p>Please login to view your profile.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>My Profile</h1>

            <p>Name: {user.name}</p>

            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;