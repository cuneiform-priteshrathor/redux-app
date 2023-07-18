import axios from "axios";
import { match } from "./matchSlice";
// import { getAdminData } from "modules/Profile/redux/profileSlice";

export const matchAsync = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "POST",
                url: `http://localhost:5000/api/auth/login`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.status === 200) {
                console.log('response: ', response);
                console.log(response.data.message)
                return dispatch(match(response))
            } else {
                console.warn(response.data.message);
            }

        } catch (error) {
            console.warn(error.response.data.message);
        }
    }
}