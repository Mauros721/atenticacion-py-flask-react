// @ts-ignore
import InjectContext from "./Contexts/AppContext.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./views/Home.tsx";
import {FC, useContext} from "react";
import {AuthContext, AuthProvider} from "./Contexts/AuthContext.tsx";
import {ReactComponentLike} from 'prop-types'
import {RegisterForm} from './views/RegisterForm.tsx';
import {LoginForm} from "./views/LoginForm.tsx";
import {Navbar} from "./component/Navbar.tsx";

interface PrivateRouteProps {
    component: ReactComponentLike
}

const Layout = () => {
    const PrivateRoute: FC<PrivateRouteProps> = ({component: Component, ...restOfComponents}) => {
        const {isAuthenticated} = useContext(AuthContext);
        return isAuthenticated ? <Component {...restOfComponents}/> : <Navigate to={'/register'}/>
    }

    return (
        <>
            <BrowserRouter>
                <Navbar/>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/home" element={<PrivateRoute component={Home}/>}/>
                </Routes>
            </AuthProvider>
            </BrowserRouter>
        </>

    )
}

export default InjectContext(Layout)