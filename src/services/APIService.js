export function postEmployee(firstname, lastname, dateOfBirth, startDate, street, city, state, zipCode, department) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            department: department
        })
    };
    return fetchAPI("create", requestOptions);
};

export function getEmployees() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchAPI("get", requestOptions);
};

async function fetchAPI(url, requestOptions) {
    let result = await fetch(`http://localhost:3001/api/employee/${url}`, requestOptions);
    let actualData = await result.json();

    return actualData;
};
