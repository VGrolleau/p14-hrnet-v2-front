export function getUserNotCo(userId) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetchAPI(`user/${userId}`, requestOptions);
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
    return fetchAPI("login", requestOptions);
};

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
    return fetchAPI("employee", requestOptions);
};

export function getEmployees(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return fetchAPI("employee", requestOptions);
};

export function updateEmployee(employee, token) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            firstname: employee.firstname,
            lastname: employee.lastname,
            dateOfBirth: employee.dateOfBirth,
            startDate: employee.startDate,
            street: employee.street,
            city: employee.city,
            state: employee.state,
            zipCode: employee.zipCode,
            department: employee.department
        })
    };
    return fetchAPI("employee", requestOptions);
};

export function deleteEmployee(employee, token) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dateOfBirth: employee.dateOfBirth,
            startDate: employee.startDate
        })
    };
    return fetchAPI("employee", requestOptions);
};

export function getUser(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    return fetchAPI('user', requestOptions);
};

export function updateUser(user, token) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        })
    };
    return fetchAPI("user", requestOptions);
};

async function fetchAPI(url, requestOptions) {
    // let result = await fetch(`http://localhost:3001/api/${url}`, requestOptions);
    let result = await fetch(`http://localhost:3306/api/${url}`, requestOptions);
    let actualData = await result.json();

    return actualData;
};
