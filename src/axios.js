import axios from 'axios';

const instance = axios.create({
    baseURL: "https://us-central1-clone-874e9.cloudfunctions.net/api" // THE API (cloud function) URL
    // for debudding baseURL: "https://localhost:5001/clone-874e9/us-central1/api" // THE API (cloud function) URL
    
});

export default instance;


