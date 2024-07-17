import React, {useContext, useState} from "react";
// @ts-ignore
import {Context} from "../Contexts/AppContext.jsx";
import {AuthContext} from '../Contexts/AuthContext.tsx'
import '../styles/view/Form.scss'
import {FluxTypes} from "../../moduletypes";
import {useNavigate} from "react-router";


export const LoginForm = () => {

    const {actions} = useContext<FluxTypes>(Context)
    const {validToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const [user, setUser] = useState(
        {
            username: '',
            email: '',
            password: '',
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password,
        }
        try {
            const response = await actions.loginUserDispatcher(userData);
            const token = response ? response.token : null;
            if (response && token) {
                localStorage.setItem('token', response.token);
                navigate('/home');
                validToken();
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <h1 className='title'>Sign In:</h1>
            <section className="Form">
                <form>
                    <div className="Form_Group">
                        <label htmlFor="">Name: </label>
                        <input type="text" value={user.username}
                               onChange={(e) => {
                                   setUser({...user, username: e.target.value});
                               }}/>
                    </div>
                    <div className="Form_Group">
                        <label htmlFor="">Email: </label>
                        <input type="email" value={user.email}
                               onChange={(e) => {
                                   setUser({...user, email: e.target.value});
                               }}/>
                    </div>
                    <div className="Form_Group">
                        <label htmlFor="">Password: </label>
                        <input type="password" value={user.password}
                               onChange={(e) => {
                                   setUser({...user, password: e.target.value});
                               }}/>
                    </div>
                    <button type='submit' className='Form_Button' onClick={handleSubmit}>SUBMIT</button>
                </form>
            </section>
        </>

    )
}