import { createContext } from "react";
import app from "../firebase/firebase.config";
import { getAuth } from "firebase/auth";


export const AuthContex = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const authInfo = {

    }
    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;