import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = true
        },
        logOut: (state, action) => {
            state.isLoggedIn = false
        },
    },
});

export const {setLoggedIn, logOut} = authSlice.actions;




// export const logout = () => async (dispatch) => {
//     localStorage.removeItem('sessionData');
//     dispatch({type: 'RESET'})
// };

export default authSlice.reducer;
