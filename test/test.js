const url = "http://localhost:9000/register";
const fetchOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "email": "test",
        "password": "test",
        "isAdmin": false
    })
};

fetch(url, fetchOptions)
.then(response => response.json())
.then(data => console.log(data))