import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUser, updateUser } from "../services/APIService";
import '../utils/style/Profile.css';
const bcrypt = require('bcryptjs');

function Profile() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const selectorToken = useSelector((state) => state.user.token);

    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [isFormModified, setIsFormModified] = useState(false);
    const [bottomMessage, setBottomMessage] = useState("");

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
    // console.log(user);

    const onInputChange = (idValue, newValue) => {
        setUpdatedUser({
            ...updatedUser,
            [idValue]: newValue,
        });
        setIsFormModified(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setUpdatedUser({});
        setIsFormModified(false);
        setBottomMessage("Canceled changes");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedData = {
                ...user,
                ...updatedUser
            };

            // check if password was updated
            if (updatedUser.password && updatedUser.password !== user.password) {
                // hash the password
                const hashedPassword = await bcrypt.hash(updatedUser.password, 10);
                updatedData.password = hashedPassword;
            } else {
                // use the existing hashed password
                updatedData.password = user.password;
            }

            await updateUser(updatedData, selectorToken);

            setUser(updatedData);

            setUpdatedUser({});
            setIsFormModified(false);
            setBottomMessage("Validated changes")
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <section className="profile-section">
            {user ? (
                <div>
                    <h2>{updatedUser.firstname || user.firstname} {updatedUser.lastname || user.lastname} profile</h2>

                    <form>
                        <div className="input">
                            <label htmlFor="firstname">Firstname</label>
                            <input type="text" id="firstname" defaultValue={updatedUser.firstname || user.firstname} onChange={(e) => onInputChange(e.target.id, e.target.value)} required />
                        </div>
                        <div className="input">
                            <label htmlFor="lastname">Lastname</label>
                            <input type="text" id="lastname" defaultValue={updatedUser.lastname || user.lastname} onChange={(e) => onInputChange(e.target.id, e.target.value)} required />
                        </div>
                        <div className="input">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" defaultValue={updatedUser.email || user.email} onChange={(e) => onInputChange(e.target.id, e.target.value)} required />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" defaultValue={updatedUser.password || user.password} onClick={(e) => e.target.value = ""} onChange={(e) => onInputChange(e.target.id, e.target.value)} required disabled />
                        </div>

                        {isFormModified ? (
                            <div className="buttons">
                                <button id="cancel-button" type="submit" onClick={handleCancel}>Cancel</button>
                                <button id="save-button" type="submit" onClick={handleSubmit}>Save changes</button>
                            </div>
                        ) : (
                            <div className="buttons">
                                <button id="cancel-button" type="submit" onClick={handleCancel} disabled>Cancel</button>
                                <button id="save-button" type="submit" onClick={handleSubmit} disabled>Save changes</button>
                            </div>
                        )}
                    </form>

                    <div className="bottom-message">
                        {bottomMessage}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    )
};

export default Profile;