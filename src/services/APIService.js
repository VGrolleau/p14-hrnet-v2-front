export function postEmployee(firstname, lastname, dateOfBirth, startDate, street, city, state, zipCode, department, token, userId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            department: department,
            userId: userId
        })
    };
    return fetchAPI("employee/create", requestOptions);
};

export function getEmployees(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return fetchAPI("employee/get", requestOptions);
};

export function loginUser(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };
    return fetchAPI("user/login", requestOptions);
}

async function fetchAPI(url, requestOptions) {
    let result = await fetch(`http://localhost:3001/api/${url}`, requestOptions);
    let actualData = await result.json();

    return actualData;
};
