import {Heading} from "../components/Heading.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {Button} from "../components/Button.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

export function Signup() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    return (

        <div className={'bg-slate-200 h-screen flex justify-center'}>
            <div className={'flex flex-col justify-center'}>
                <div className={'rounded-lg bg-white w-80 text-center p-2 h-max px-4'}>
                    <Heading label={'Sign Up'} />
                    <SubHeading label={'Enter details to continue'} />
                    <InputBox onChange={e=>{
                        setFirstName(e.target.value)
                    }} label={'First Name'} placeholder={'John'}/>
                    <InputBox onChange={e=>{
                        setLastName(e.target.value)
                    }} label={'Last Name'} placeholder={'Doe '}/>
                    <InputBox onChange={e=>{
                        setUserName(e.target.value)
                    }} label={'Username'} placeholder={'johndoe@gmail.com'}/>
                    <InputBox onChange={e=>{
                        setPassword(e.target.value)
                    }} label={'Password'} placeholder={'Password'}/>
                    <div className='pt-4'>
                        <Button onClick={async ()=>{
                            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                userName,
                                firstName,
                                lastName,
                                password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate('/dashboard')
                        }} label={'Sign Up'} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}