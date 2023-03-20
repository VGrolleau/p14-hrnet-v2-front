import '../utils/style/SignIn.css';
import Input from "../components/Input";
import { regexEmail } from '../utils/global/globalRegex';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

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
            setErrors(formErrors);
            return;
        }

        navigate('/create-employee');
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
            </form>
        </section>
    )
};

export default SignIn;