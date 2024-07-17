import React, {useContext, useState} from "react";
// @ts-ignore
import {Context} from "../Contexts/AppContext.jsx";
import {FluxTypes} from "../../moduletypes";
import '../styles/view/Form.scss';

export const RegisterForm = () => {
    const [user, setUser] = useState(
        {
            username: '',
            email: '',
            password: '',
        }
    )

    const {actions} = useContext<FluxTypes>(Context);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password
        }
        try {
            const result = await actions.registerUserDispatcher(userData);
            if (result && result.success) {
                console.log(result)
                console.log('Response:', result);
                localStorage.setItem('username', result.user_name);
                localStorage.setItem('email', result.email);
                localStorage.setItem('user_id', result.user_id);
                localStorage.setItem('token', result.token);
                window.location.href = '/';
            }
        } catch (error) {
            alert('Error logging in user' + error)
        }
    }

    return (
        <>
            <h1 className='title'>Sign Up:</h1>
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
                        <label>Password: </label>
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