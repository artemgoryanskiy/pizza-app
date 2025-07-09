import {configureStore} from '@reduxjs/toolkit';
import {JWT_PERSIST_KEY, userSlice} from './user.slice.ts';
import {saveState} from './storage.ts';
import {CART_PERSISTED_STATE, cartSlice} from './cart.slice.ts';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
    },
})

store.subscribe(() => {
    saveState(JWT_PERSIST_KEY, {jwt: store.getState().user.jwt});
    saveState(CART_PERSISTED_STATE, store.getState().cart);
})

