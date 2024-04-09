import { ActionType, InitialStateType, LoginActionKind } from '@/types/LoginContextType';
import React, { createContext, useReducer } from 'react'

export const initialState: InitialStateType = {
    isLogin: false,
    searchItem: ''
}

// const defaultState={
//   state:initialState,
//   dispatch: ()=>void
// } as loginContextType;

export const loginContext = createContext<any>(initialState);

const LoginContext = ({ children }: any) => {
    const reducer = (state: InitialStateType, action: ActionType) => {
        switch (action.type) {
            case LoginActionKind.LOGIN: {
                console.log(state, action.payload);
                return { ...state, isLogin: action.payload };
            }
            case LoginActionKind.LOGOUT: {
                console.log("logout");

                return { ...state, isLogin: action.payload };
            }
            case LoginActionKind.SEARCH: {
                return { ...state, searchItem: action.payload };
            }
            default: throw new Error(`Unhandled action type: ${action.type}`);
        }

    }

    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log(state);

    return (
        <loginContext.Provider value={{ state, dispatch }}>
            {children}
        </loginContext.Provider>
    )
}

export default LoginContext