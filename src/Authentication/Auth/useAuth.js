import { useContext } from "react";
import AuthContext from "./JWTAuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
