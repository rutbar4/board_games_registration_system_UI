import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  organisation: null,
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, organisation } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      organisation,
    };
  },
  LOGIN: (state, action) => {
    const { user, organisation } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      organisation,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    organisation: null,
  }),
  REGISTER: (state, action) => {
    const { user, organisation } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      organisation,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(), // isAUthenticated
  logout: () => Promise.resolve(),
  signupUser: () => Promise.resolve(),
  signupOrganisation: () => Promise.resolve(),
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        setSession(accessToken);
        const response = await axios.get("http://localhost:7293/api/profile");
        if (accessToken && response) {
          if (response.data.organisation) {
            const organisation = response.data;
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                organisation,
              },
            });
          } else if (response.data.user) {
            const user = response.data;
            dispatch({
              type: "INITIALIZE",
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          }
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
              organisation: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
            organisation: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (name, password) => {
    const response = await axios.post("http://localhost:7293/api/v1/Auth", {
      username: name,
      password,
    });
    if (response.data.organisation) {
      const { token, organisation } = response.data;

      setSession(token);
      dispatch({
        type: "LOGIN",
        payload: {
          organisation,
        },
      });
    }
    if (response.data.user) {
      const { token, user } = response.data;
      setSession(token);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const signupUser = async (name, username, email, password) => {
    const response = await axios.post(
      "http://localhost:7293/api/v1/Auth/registerUser",
      {
        name,
        username,
        email,
        password,
      }
    );
    const { token, user } = response.data;

    window.localStorage.setItem("accessToken", token);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const signupOrganisation = async (
    name,
    username,
    email,
    address,
    city,
    password
  ) => {
    const response = await axios.post(
      "http://localhost:7293/api/v1/Auth/registerOrganisation",
      {
        name,
        username,
        email,
        address,
        city,
        password,
      }
    );
    const { token, organisation } = response.data;

    window.localStorage.setItem("accessToken", token);
    dispatch({
      type: "REGISTER",
      payload: {
        organisation,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        signupUser,
        signupOrganisation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
