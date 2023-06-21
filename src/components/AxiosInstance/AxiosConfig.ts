import axios from "axios";

export const axiosInstance = axios.create({    
    headers: {
        "Content-Type": "application/json",
    },
});

// axios#post(url[, data[, config]]) , axios#get(url[, config])