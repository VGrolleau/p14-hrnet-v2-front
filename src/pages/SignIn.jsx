import '../utils/style/SignIn.css';
import Input from "../components/Input.jsx";
import { regexEmail } from '../utils/global/globalRegex';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getUserNotCo, loginUser } from '../services/APIService';
import { useDispatch } from 'react-redux';
import { connectUser } from '../redux';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [userNotCo, setUserNotCo] = useState({});
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                let actualData = await getUserNotCo(1);
                setUserNotCo(actualData.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        getData();
    }, []);

    let dataForm = [
        {
            id: "email",
            label: "email",
            type: "email"
        },
        {
            id: "password",
            label: "password",
            type: "password"
        }
    ];

    const errorMessages = {
        email: {
            verb: "enter",
            name: "email"
        },
        password: {
            verb: "enter",
            name: "password"
        }
    };

    const validateInput = (value, regex, errorMessage) => {
        if (!value) {
            return errorMessage;
        }
        if (regex && !value.match(regex)) {
            return "Please enter a valid value";
        }
        return "";
    };

    const setErrorFunction = (newValue, newAbbreviation = null, stringKey, errorMessage, regex = null, settingFunction) => {
        const finalErrorMessage = validateInput(newValue, regex, errorMessage);
        setErrors((prevErrors) => ({ ...prevErrors, [stringKey]: finalErrorMessage }));
        if (!finalErrorMessage) {
            typeof settingFunction === "function" && settingFunction(newAbbreviation ?? newValue);
        }
    };

    const handleInput = (idValue, newValue) => {
        switch (idValue) {
            case "email":
                setErrorFunction(newValue, null, "email", `Please ${errorMessages.email.verb} ${errorMessages.email.name}`, regexEmail, setEmail);
                break;

            case "password":
                setErrorFunction(newValue, null, "password", `Please ${errorMessages.password.verb} ${errorMessages.password.name}`, null, setPassword);
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        formErrors["email"] = validateInput(email, regexEmail, `Please ${errorMessages.email.verb} ${errorMessages.email.name}`);
        formErrors["password"] = validateInput(password, null, `Please ${errorMessages.password.verb} ${errorMessages.password.name}`);

        // check other fields for errors here
        if (Object.keys(formErrors).some((key) => formErrors[key])) {
            setShowError(true);
            setErrors(formErrors);
            return;
        }

        try {
            const response = await loginUser(email, password);

            if (response && response.token) {
                dispatch(connectUser(response));
                navigate('/sites/openclassrooms/create-employee');
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, login: response.message }));
                setShowError(true);
            }
        } catch (error) {
            console.log(error);
            setErrors((prevErrors) => ({ ...prevErrors, login: 'An error occurred while logging in. Please try again later.' }));
            setShowError(true);
        }

        // clear login error message
        if (errors.login !== undefined && !showError) {
            setErrors((prevErrors) => ({ ...prevErrors, login: "" }));
        }
    };

    return (
        <section className='signin-section'>
            <h2>Connection</h2>

            <form onSubmit={handleSubmit}>
                {
                    dataForm.map((obj, index) => {
                        return <Input id={obj.id} label={obj.label} type={obj.type} error={errors[obj.id]} onUpdate={handleInput} key={`${obj.id}-${index}`} />
                    })
                }

                <button id='signin-button'>Connection</button>

                {showError ? (
                    <p>
                        {errors.login}
                    </p>
                ) : (
                    <p></p>
                )}
            </form>

            {Object.keys(userNotCo).length !== 0 ? (
                <div>
                    <p>To connect, please enter :</p>
                    <ul>
                        <li>email : <span>{userNotCo.email}</span></li>
                        <li>password : <span>Pa$$w0rd</span></li>
                    </ul>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    )
};

export default SignIn;