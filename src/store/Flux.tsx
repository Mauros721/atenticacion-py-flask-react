// @ts-ignore
import {logInUserRequests, deleteUserRequest, registerUserRequests} from '../HTTPCalls/HTTPCalls.jsx';

import {FluxTypes, StoreFunctions, UserType} from "../../moduletypes";

export const State = ({getStore, setStore}: StoreFunctions): FluxTypes => {
    return {
        store: {
            users: []
        },
        actions: {
            registerUserDispatcher: async (userData: UserType): Promise<UserType | null> => {
                try {
                    const newUser = await registerUserRequests(userData);
                    const store = getStore();
                    setStore({...store, users: newUser});
                    return newUser
                } catch (error) {
                    alert('Register Failed!' + error);
                    return null
                }
            },
            loginUserDispatcher: async (userData: UserType): Promise<UserType | null> => {
                try {
                    const response = await logInUserRequests(userData);
                    const token = response.token;
                    if (!token) {
                        alert('Login Failed!')
                    }
                    localStorage.setItem('token', token);
                    return response
                } catch (error) {
                    console.error('Error logging in user' + error);
                    return null;
                }
            },
            setDeleteUserDispatcher: async (id: number) => {
                try {
                    const response = await deleteUserRequest(id);
                    if (!response.ok) {
                        alert({'Error deleting in user': response.statusText});
                    }
                    return await response.json();
                }
                catch (error) {
                    alert('Error deleting in user' + error);
                }
            }
        }
    }
}