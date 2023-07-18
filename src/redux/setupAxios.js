// import { logout } from "modules/authentication/redux/authSlice";

export default function setupAxios(axios, store) {
    axios.interceptors.request.use(config => {
        const { auth } = store.getState();
        if (auth) {
            config.headers.Authorization = auth;
        }
        return config;
    },
        err => Promise.reject(err)
    );
    axios.interceptors.response.use(

        response => {
            return response
        },

        err => {
            if (err.response && (err.response.status === 401)) {
                // store.dispatch(logout());
            }
            return err.response;
        }
    );
}
