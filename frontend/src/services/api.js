const API_URL = `http://0.0.0.0:5000`;


const getAllSongs = () =>{
    return fetch(`${API_URL}/songs`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error => error);
}


const postVote = list => {
    return fetch(`${API_URL}/vote`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
    })
        .then(response => response.json())
        .then(response => response)
        .catch(error => error);
}


export {
    getAllSongs,
    postVote
};
