import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserProfileView } from "../components/Community/UserProfileView";
import { Loader } from "lucide-react";

export default function PublicProfile() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
                const response = await fetch(`${apiBaseUrl}/api/u/${username}`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("User not found");
                }

                const result = await response.json();
                if (result.success) {
                    const data = result.data;
                    setUserData(data);

                    // Check if it's the owner
                    const userStr = localStorage.getItem("user");
                    const currentUser = userStr ? JSON.parse(userStr) : null;
                    if (currentUser && currentUser.username === data.username) {
                        setIsOwner(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
                <h1 className="text-2xl font-bold mb-4">User not found</h1>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-600 hover:underline"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <UserProfileView
            user={userData}
            mode={isOwner ? "owner" : "public"}
            onBack={() => navigate(-1)}
        />
    );
}
