import axios from "axios";
import { match } from "./matchSlice";
// import { getAdminData } from "modules/Profile/redux/profileSlice";

export const matchAsync = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "POST",
                url: `http://localhost:3301/api/admin/logIn`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log('response: ', response);
            if (response.data.code === 200) {
                console.log(response.data.message)
                return dispatch(match(response.data))
            } else {
                console.warn(response.data.message);
            }

        } catch (error) {
            console.warn(error.response.data.message);
        }
    }
}