import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUser } from "../services/APIService";

function Profile() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const selectorToken = useSelector((state) => state.user.token);

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) navigate("/");

        const getData = async () => {
            try {
                let actualData = await getUser(selectorToken);
                setUser(actualData.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        getData();
    }, [isLogged, navigate, selectorToken]);

    return (
        <section className="profile-section">
            <h2>profile</h2>

            {user ? (
                <div>
                    <div>{user.firstname}</div>
                    <div>{user.lastname}</div>
                    <div>{user.email}</div>
                    {/* etc. */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    )
};

export default Profile;