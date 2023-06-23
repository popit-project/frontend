import axios from "axios";

export const axiosInstance = axios.create({    
    headers: {
        "Content-Type": "application/json",
    },
});

// axios#post(url[, data[, config]]) , axios#get(url[, config])

axios.interceptors.response.use(
    function (response) {
        //response로 서버에서 응답이 오기전에 다양한 처리를 할 수 있다!
        return response;
    },
    function (error) {
        //에러 발생 코드.
        return Promise.reject(error);
    }
);