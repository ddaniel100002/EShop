import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, action.payload] } };


        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const body = { state, dispatch };
    return <Store.Provider value={body}>
        {props.children}
    </Store.Provider>
}