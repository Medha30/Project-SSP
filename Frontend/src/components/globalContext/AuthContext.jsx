// AuthContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import {
    getUserInfo,
    saveUserInfo,
    removeUserInfo,
    checkValidToken
} from '../../utils/localStorage/userLocalStorage';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (checkValidToken()) {
            const userInfo = getUserInfo();
            dispatch({ type: 'LOGIN', payload: { user: userInfo.name, token: userInfo.authToken } });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            saveUserInfo(state.user, state.token);
        } else {
            removeUserInfo();
        }
    }, [state]);

    const login = (user, token) => {
        console.log(JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: { user, token } });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
