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

const postVote = list =>
    fetch(`${API_URL}/vote`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);

export {
    getAllSongs,
    postVote
};
