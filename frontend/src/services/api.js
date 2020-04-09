const API_URL = `/api`;


const getAllSongs = () =>
    fetch(`${API_URL}/allSongs`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(response => response.data)
        .catch(error => error);


export {
    getAllSongs
};
