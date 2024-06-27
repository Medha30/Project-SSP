import React, { createContext, useReducer, useEffect } from 'react';

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
        const savedState = localStorage.getItem('authState');
        if (savedState) {
            dispatch({ type: 'LOGIN', payload: JSON.parse(savedState) });
        }
    }, []);

    useEffect(() => {
        if (state.isAuthenticated) {
            localStorage.setItem('authState', JSON.stringify({
                user: state.user,
                token: state.token
            }));
        } else {
            localStorage.removeItem('authState');
        }

        // localStorage.getItem("authState")
        console.log('yuhuu',localStorage.getItem("authState"));
    }, [state]);

    const login = (user, token) => {
        console.log("==/m===",user,token);
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
