import {UserType} from "./src/store/Flux.tsx";

declare module '*/react.svg' {
    const reactLogo: string;
    export default reactLogo
}

declare module '*/HTTPCalls.jsx' {
    const logInUserRequests = async () => Promise<PromiseConstructor>;
    const registerUserRequests = async () => Promise<PromiseConstructor>;
    const deleteUserRequest = async () => Promise<PromiseConstructor>;
    export { logInUserRequests, registerUserRequests, deleteUserRequest };
}



export interface UserType {
    user_id: string;
    user_name: string;
    email: string;
    password: string;
}

export interface FluxTypes {
    store: {
        users: UserType[];
    },
    actions: {
        registerUserDispatcher: (userData: UserType) => Promise<UserType>;
        loginUserDispatcher: (userData: UserType) => Promise<UserType | null>;
        setDeleteUserDispatcher: (id: number) => Promise<void>;
    }

}

export interface StoreFunctions extends FluxTypes {
    getStore: () => FluxTypes;
    setStore: (updatedStore: Partial<FluxTypes['store']>) => void;
}

