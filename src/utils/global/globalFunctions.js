export const validateInput = (value, regex, errorMessage) => {
    if (!value) {
        return errorMessage;
    }
    if (regex && !value.match(regex)) {
        return "Please enter a valid value";
    }
    return "";
};

export const setErrorFunction = (newValue, newAbbreviation = null, stringKey, errorMessage, regex = null, settingFunction) => {
    const finalErrorMessage = validateInput(newValue, regex, errorMessage);
    setErrors((prevErrors) => ({ ...prevErrors, [stringKey]: finalErrorMessage }));
    if (!finalErrorMessage) {
        typeof settingFunction === "function" && settingFunction(newAbbreviation ?? newValue);
    }
};