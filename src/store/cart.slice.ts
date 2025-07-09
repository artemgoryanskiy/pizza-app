import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {loadState} from './storage.ts';

export const CART_PERSISTED_STATE = 'cartData';

export interface CartItem {
    id: number;
    count: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTED_STATE) || {
    items: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clean: (state) => {
            state.items = [];
        },
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        remove: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(item => item.id === action.payload);
            if (!existed) {
                return;
            }
            state.items.map(item => {
                if (item.id === action.payload) {
                    if (item.count === 1) {
                        state.items = state.items.filter(item => item.id !== action.payload);
                    }
                    item.count--;
                }
                return item;
            });
        },
        add: (state, action: PayloadAction<number>) => {
            const existed = state.items.find(item => item.id === action.payload);
            if (!existed) {
                state.items.push({id: action.payload, count: 1});
                return;
            }
            state.items.map(item => {
                if (item.id === action.payload) {
                    item.count++;
                }
                return item;
            });
        }
    },

});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;