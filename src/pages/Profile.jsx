import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import { getUser, updateUser } from "../services/APIService";
import { regexText, regexEmail, regexNewPassword } from "../utils/global/globalRegex";
import '../utils/style/Profile.css';

function Profile() {
    const isLogged = useSelector((state) => state.user.isLogged);
    const selectorToken = useSelector((state) => state.user.token);

    const [user, setUser] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [isFormModified, setIsFormModified] = useState(false);
    const [bottomMessage, setBottomMessage] = useState("");
    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) navigate("/sites/openclassrooms");

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

    const validateField = (id, value) => {
        switch (id) {
            case "firstname":
                return value && !regexText.test(value) ? "Invalid first name" : "";
            case "lastname":
                return value && !regexText.test(value) ? "Invalid last name" : "";
            case "email":
                return value && !regexEmail.test(value) ? "Invalid email" : "";
            case "password":
                return value && !regexNewPassword.test(value) ? "Invalid password" : "";
            default:
                return "";
        }
    };

    const onInputChange = (idValue, newValue) => {
        setUpdatedUser({
            ...updatedUser,
            [idValue]: newValue,
        });
        const error = validateField(idValue, newValue);
        switch (idValue) {
            case "firstname":
                setFirstnameError(error);
                break;
            case "lastname":
                setLastnameError(error);
                break;
            case "email":
                setEmailError(error);
                break;
            case "password":
                setPasswordError(error);
                break;
            default:
                break;
        }
        setIsFormModified(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setUpdatedUser({});
        setIsFormModified(false);
        setBottomMessage("Canceled changes");
        setFirstnameError("");
        setLastnameError("");
        setEmailError("");
        setPasswordError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstnameError || lastnameError || emailError || passwordError) {
            setBottomMessage("Please fix the errors before submitting");
            return;
        }

        try {
            let updatedData = {
                ...user,
                ...updatedUser,
            };

            // check if password was updated
            if (updatedUser.password && updatedUser.password !== user.password) {
                updatedData.password = updatedUser.password;
            } else {
                // ignore password property
                delete updatedData.password;
            }

            await updateUser(updatedData, selectorToken);

            setBottomMessage("Validated changes");
            setUpdatedUser({});
            setIsFormModified(false);
            setUser(updatedData);
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
                        <Input
                            id="firstname"
                            label="Firstname"
                            type="text"
                            error={firstnameError}
                            onUpdate={onInputChange}
                            defaultValue={updatedUser.firstname || user.firstname}
                            required="required"
                        />
                        <Input
                            id="lastname"
                            label="Lastname"
                            type="text"
                            error={lastnameError}
                            onUpdate={onInputChange}
                            defaultValue={updatedUser.lastname || user.lastname}
                            required="required"
                        />
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            error={emailError}
                            onUpdate={onInputChange}
                            defaultValue={updatedUser.email || user.email}
                            required="required"
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            error={passwordError}
                            onUpdate={onInputChange}
                            defaultValue={updatedUser.password || user.password}
                            required="required"
                            disabled="disabled"
                            onClick={(e) => e.target.value = ""}
                        />

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