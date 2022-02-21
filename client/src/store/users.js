import { createSlice, createAction } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import { toast } from "react-toastify";

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
        createUserFailed: (state, action) => {
            state.error = action.payload;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
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
    userLoggedOut,
    userUpdateFailed,
    createUserFailed
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");

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
            toast.success("Успешный вход");
            if (data.role === "admin") {
                history.push("/admin/");
            } else {
                history.push(redirect);
            }
        } catch (error) {
            toast.error("Ошибка входа");
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
            const { user, tokens } = await authService.register({
                email,
                password
            });
            dispatch(authRequestSuccess({ userId: user._id, role: user.role }));
            localStorageService.setTokens({
                ...tokens,
                userId: user._id,
                role: user.role
            });
            dispatch(userCreated(user));
            toast.success("Успешная регистрация");
            history.push("/cart/");
        } catch (error) {
            const { message } = error.response?.data;
            const { status: code } = error.response;
            toast.error(message || error.message || "Ошибка");
            if (code === 400) {
                dispatch(authRequestFailed(message));
                dispatch(createUserFailed(message));
            } else {
                dispatch(authRequestFailed(error.message));
                dispatch(createUserFailed(error.message));
            }
        }
    };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export function updateUserData(userId, payload) {
    return async function (dispatch) {
        dispatch(userUpdateRequested());
        try {
            const { content } = await userService.update(userId, payload);
            dispatch(userUpdated(content));
            toast.success("Данные обновлены");
        } catch (error) {
            toast.error("Ошибка обновления");
            dispatch(userUpdateFailed(error.message));
        }
    };
}
export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        toast.error("Ошибка загрузки");
        dispatch(usersRequestFiled(error.message));
    }
};
export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
    return null;
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth?.userId;
export const getCurrentUserRole = () => (state) => state.users.auth?.role;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;
export default usersReducer;
