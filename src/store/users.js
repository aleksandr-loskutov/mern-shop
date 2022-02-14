import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: [],
          isLoading: true,
          error: null,
          auth: {
              userId: localStorageService.getUserId(),
              role: localStorageService.getUserRole()
          },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: [],
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            //TODO removed state.entities.push from here coz we are calling loadUsersList in appLoader if authorized
        },
        userUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = [];
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});
const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userUpdated,
    userLoggedOut
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const createUpdateFailed = createAction("users/createUpdateFailed");
const createUserFailed = createAction("users/createUserFailed");
export const login =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(
                authRequestSuccess({ userId: data.userId, role: data.role })
            );
            localStorageService.setTokens(data);
            if (data.role === "admin") {
                history.push("/admin");
            } else {
                history.push(redirect);
            }
        } catch (error) {
            const { message } = error.response?.data;
            const { status: code } = error.response;
            if (code === 400) {
                // const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(message));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };
export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(userCreateRequested());
        dispatch(authRequested());
        try {
            const data = await authService.register({
                email,
                password
            });
            dispatch(
                authRequestSuccess({ userId: data.userId, role: data.role })
            );
            localStorageService.setTokens(data);
            dispatch(userCreated());
            history.push("/cart");
        } catch (error) {
            console.log(error.message);
            const { message } = error.response?.data;
            const { status: code } = error.response;
            if (code === 400) {
                // const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(message));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export function updateUserData(payload) {
    return async function (dispatch) {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(payload);
            dispatch(userUpdated(content));
            history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(createUpdateFailed(error.message));
        }
    };
}
export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
    console.log(
        "localStorageService.getUserId()",
        localStorageService.getUserId()
    );
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getCurrentUserRole = () => (state) => state.users.auth?.role;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
