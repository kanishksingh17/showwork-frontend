import { useNavigate } from "react-router-dom";
import { UserProfileView } from "../components/Community/UserProfileView";

export default function Profile() {
    const navigate = useNavigate();

    // Get current user from localStorage
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;

    // Create a profile object from the user data with fallbacks
    const userProfile = {
        name: currentUser?.name || "Guest User",
        email: currentUser?.email || "guest@example.com",
        avatar: currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name || "U"}&background=3B82F6&color=fff`,
        role: currentUser?.role || "Developer",
        bio: currentUser?.bio || "Full Stack Developer",
        points: currentUser?.points || "12.4k",
        username: currentUser?.username || currentUser?.email?.split("@")[0] || "username",
    };

    return (
        <UserProfileView
            user={userProfile}
            onBack={() => navigate("/dashboard")}
        />
    );
}
