import { DropdownMenu } from "dropdown-menu-component";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { dataForm, states, departments } from "../data";
import { postEmployee } from "../services/APIService";
import { regexCity, regexStreet, regexText, regexZip } from "../utils/global/globalRegex";
import '../utils/style/CreateEmployee.css';

function CreateEmployee() {
    useEffect(() => { document.title = "HRnet - Home" });
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [department, setDepartment] = useState('');
    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({});

    const textModal = "Employee created!";

    let dataNameBlock = [];
    let dataAddressBlock = [];
    let dataDepartmentBlock = [];

    dataForm.map((block) => {
        if (block.nameBloc) {
            for (const obj of block.nameBloc) {
                dataNameBlock.push(obj);
            }
        }
        if (block.addressBloc) {
            for (const obj of block.addressBloc) {
                dataAddressBlock.push(obj);
            }
        }
        if (block.departmentBloc) {
            for (const obj of block.departmentBloc) {
                dataDepartmentBlock.push(obj);
            }
        }
        return (dataNameBlock, dataAddressBlock, dataDepartmentBlock);
    });

    const toggleModal = () => {
        setModal(!modal);
    };

    const errorMessages = {
        firstName: {
            verb: "enter",
            name: "first name"
        },
        lastName: {
            verb: "enter",
            name: "last name"
        },
        dateOfBirth: {
            verb: "choose",
            name: "date of birth"
        },
        startDate: {
            verb: "choose",
            name: "start date"
        },
        street: {
            verb: "enter",
            name: "street"
        },
        city: {
            verb: "enter",
            name: "city"
        },
        state: {
            verb: "choose",
            name: "state"
        },
        zipCode: {
            verb: "enter",
            name: "zip code"
        },
        department: {
            verb: "choose",
            name: "department"
        },
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

    const handleState = (newValue, newAbbreviation) => {
        setErrorFunction(newValue, newAbbreviation, "state", `Please ${errorMessages.state.verb} employee ${errorMessages.state.name}`, null, setState);
    };

    const handleDepartment = (newValue) => {
        setErrorFunction(newValue, null, "department", `Please ${errorMessages.department.verb} employee ${errorMessages.department.name}`, null, setDepartment);
    };

    const handleInput = (idValue, newValue) => {
        switch (idValue) {
            case "first-name":
                setErrorFunction(newValue, null, "first-name", `Please ${errorMessages.firstName.verb} employee ${errorMessages.firstName.name}`, regexText, setFirstName);
                break;

            case "last-name":
                setErrorFunction(newValue, null, "last-name", `Please ${errorMessages.lastName.verb} employee ${errorMessages.lastName.name}`, regexText, setLastName);
                break;

            case "date-of-birth":
                setErrorFunction(newValue, null, "date-of-birth", `Please ${errorMessages.dateOfBirth.verb} employee ${errorMessages.dateOfBirth.name}`, null, setDateOfBirth);
                break;

            case "start-date":
                setErrorFunction(newValue, null, "start-date", `Please ${errorMessages.startDate.verb} employee ${errorMessages.startDate.name}`, null, setStartDate);
                break;

            case "street":
                setErrorFunction(newValue, null, "street", `Please ${errorMessages.street.verb} employee ${errorMessages.street.name}`, regexStreet, setStreet);
                break;

            case "city":
                setErrorFunction(newValue, null, "city", `Please ${errorMessages.city.verb} employee ${errorMessages.city.name}`, regexCity, setCity);
                break;

            case "zip-code":
                setErrorFunction(newValue, null, "zip-code", `Please ${errorMessages.zipCode.verb} employee ${errorMessages.zipCode.name}`, regexZip, setZipCode);
                break;

            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {};
        formErrors["first-name"] = validateInput(firstName, regexText, `Please ${errorMessages.firstName.verb} employee ${errorMessages.firstName.name}`);
        formErrors["last-name"] = validateInput(lastName, regexText, `Please ${errorMessages.lastName.verb} employee ${errorMessages.lastName.name}`);
        formErrors["date-of-birth"] = validateInput(dateOfBirth, null, `Please ${errorMessages.dateOfBirth.verb} employee ${errorMessages.dateOfBirth.name}`);
        formErrors["start-date"] = validateInput(startDate, null, `Please ${errorMessages.startDate.verb} employee ${errorMessages.startDate.name}`);
        formErrors["street"] = validateInput(street, regexStreet, `Please ${errorMessages.street.verb} employee ${errorMessages.street.name}`);
        formErrors["city"] = validateInput(city, regexCity, `Please ${errorMessages.city.verb} employee ${errorMessages.city.name}`);
        formErrors["state"] = validateInput(state, null, `Please ${errorMessages.state.verb} employee ${errorMessages.state.name}`);
        formErrors["zip-code"] = validateInput(zipCode, regexZip, `Please ${errorMessages.zipCode.verb} employee ${errorMessages.zipCode.name}`);
        formErrors["department"] = validateInput(department, null, `Please ${errorMessages.department.verb} employee ${errorMessages.department.name}`);

        // check other fields for errors here
        if (Object.keys(formErrors).some((key) => formErrors[key])) {
            setErrors(formErrors);
            return;
        }

        await postEmployee(firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department);

        toggleModal();
    };

    return (
        <section className="create-employee-section">
            <h2>Create employee</h2>

            <form onSubmit={handleSubmit}>
                <div id="nameBloc">
                    {dataNameBlock.map((obj, index) => {
                        return <Input id={obj.id} label={obj.label} type={obj.type} error={errors[obj.id]} onUpdate={handleInput} key={`${obj.id}-${index}`} />
                    })}
                </div>

                <fieldset className="address" id="addressBloc">
                    <legend>Address</legend>

                    {dataAddressBlock.map((obj, index) => {
                        if (obj.category === "input") {
                            return <Input id={obj.id} label={obj.label} type={obj.type} error={errors[obj.id]} onUpdate={handleInput} key={`${obj.id}-${index}`} />
                        }
                        else {
                            return <DropdownMenu id={obj.id} label={obj.label} dataOptions={states} error={errors[obj.id]} onUpdate={handleState} key={`${obj.id}-${index}`} />
                        }
                    })}
                </fieldset>

                <div id="departmentBloc">
                    {dataDepartmentBlock.map((obj, index) => {
                        return <DropdownMenu id={obj.id} label={obj.label} dataOptions={departments} error={errors[obj.id]} onUpdate={handleDepartment} key={`${obj.id}-${index}`} />
                    })}
                </div>

                <button id="create-button">Save</button>
            </form>
            {modal && (
                <Modal toggleModal={toggleModal} textModal={textModal} />
            )}
        </section>
    )
}

export default CreateEmployee;