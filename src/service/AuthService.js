import axios from "axios";

const AUTH_BASE_URL = "/api/auth"

class AuthService {

    login(loginRequest) {
        return axios.post(AUTH_BASE_URL + "/login", loginRequest)
    }

    register(registerRequest) {
        return axios.post(AUTH_BASE_URL + "/register", registerRequest);
    }

    validateJwt(jwt) {
        return axios.get(AUTH_BASE_URL + "/validate?token=" + jwt);
    }
}

export default new AuthService;