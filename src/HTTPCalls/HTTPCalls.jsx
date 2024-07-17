const serverURL = 'http://localhost:5000';

export const registerUserRequests = async (userData) => {
    console.log('serverURL:', serverURL)
    const response = await fetch(`${serverURL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
        mode: 'cors'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

}

export const logInUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

}

export const deleteUserRequest = async (id) => {
    const response = await fetch(`http://121.0.0.1:5000/user?user_id=${id}`, {
        method: "DELETE"});
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json;
    console.log(data);
    return data;
}