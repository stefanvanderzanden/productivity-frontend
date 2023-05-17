import {useSelector} from "react-redux";

const useAuth = () => {
    const authStore = useSelector((state) => state.auth)
    const {userStatus, loginStatus, user} = authStore;
    const currentUserID = user && user.id
    const isAuthenticated = user && !!currentUserID
    const authenticationError = authStore.authenticationError;

    return {
        user,
        userStatus,
        loginStatus,
        isAuthenticated,
        authenticationError,
    };
};

export default useAuth;