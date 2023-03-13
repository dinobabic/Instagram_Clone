import axios from "axios";

const USER_BASE_URL = "/api/users"

class UserService {

    getUsers(config) {
        return axios.get(USER_BASE_URL, config);
    }
}

export default new UserService();