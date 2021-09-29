import React, { useRef, useState } from 'react';
import styled from 'styled-components' //installed via "npm install styled-components"
import { Link, useHistory } from 'react-router-dom' //installed via "npm install react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import ErrorIcon from '@material-ui/icons/Error';


import { database } from '../firebase';


export default function Signup() {

    // const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)

    
    const [currentUser, setCurrentUser] = useState()
    // const[isAdmin, setIsAdmin] = useState("false")
    const history = useHistory()

    // const { currentUser, logout } = useAuth()

    async function handleSubmit (e){
        e.preventDefault()
        // if(emailRef.current.value == "ishaq.kassam@gmail.com"){
        //     setIsAdmin(true)
        // }
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return  setError('The Passswords Do Not Match')
        }
        try{
            setError('')
            setLoading(true)  
            console.log('passwords match')

            await signup(emailRef.current.value, passwordRef.current.value)
            console.log('signup successful')
            
            history.push('/')
            
            
        }
        catch{
            setError('Account Creation Failed' + error)
            console.log(error)
        }
        setLoading(false)
        
    }

    return (        
            <Container>
                <RegisterContainer>
                    <h3>Signup</h3>
                    <hr/>

                     {/* // this code checks if theres error - it displays an error component */}
                    { 
                    error && 
                        <ErrorComponent>
                            <ErrorIcon className="error_icon"/>
                            {error}
                        </ErrorComponent>
                    }

                    <form onSubmit={handleSubmit} >
                        {/* <Name>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text"  ref={nameRef} required/> 
                        </Name> */}
                        <Email>
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" ref={emailRef} required />
                        </Email>
                        <Password>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" ref={passwordRef} required  />
                        </Password>
                        <ConfirmPassword>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input id="confirm_password" type="password" ref={confirmPasswordRef}  required />
                        </ConfirmPassword>
                        <Submit>
                            <button disabled={loading} type="submit" >Sign Up</button>
                        </Submit>

                    </form>
                    <LoginText>
                        <h6>Already Have an Account? <Link to="/login">Login</Link></h6>
                    </LoginText>
                </RegisterContainer>

                    
            </Container>
        
        
    )
}


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ErrorComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: red;
    font-weight: bold;
    background-color: #ffc1c1;
    margin: 0 11%;

    .error_icon{
        transform: scale(0.8);
    }
`

const RegisterContainer = styled.div`
    width: 450px;
    margin: auto;
    padding: 50px 0;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;    

    h3{
        text-align: center;
        margin-bottom: 10px;
        font-size: 24px;
    }

    hr{
        margin: 0 11%;
    }
    
    form{
        margin:  15px;

        input{
            width: 250px;
            margin-right: 10px;
            font-size: 15px;
            cursor: text;
            border: none;
            border-bottom: 1px solid grey;
            :focus{
                outline: none;
            }
        }
        label{
            display: flex;
            align-items: center;
            margin-left: 10px;
        }
    }
`
// const Name = styled.div`
//     display: flex;
//     justify-content: space-between;
//     padding-top: 20px;
//     height: 30px;
// `
const Email = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    height: 30px;
`
const Password = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    height: 30px;
`
const ConfirmPassword = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    height: 30px;
`
const Submit = styled.div`
    text-align: center;
    margin: 20px 10px 0 10px;
    padding: 20px 0 5px 0;
    height: 30px;
    button{
        height: 30px;
        padding: 0;
        margin-bottom: 5px;
        background: transparent;
        border: 1px solid blue;
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
    }
`
const LoginText = styled.div`
    text-align: center;
    font-size: 17px;
    h6{
        a{
            text-decoration: underline;
            cursor: pointer;
        }
    }
`