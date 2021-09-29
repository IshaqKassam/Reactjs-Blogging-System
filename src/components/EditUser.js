import React, { useState, useRef } from 'react'
import styled from 'styled-components' //installed via "npm install styled-components"
import { Link, useHistory } from 'react-router-dom' //installed via "npm install react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import ErrorIcon from '@material-ui/icons/Error';
import { storage } from '../firebase'
// import Header from './Header'

import { database } from '../firebase';

export default function EditUser() {

    
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const pictureRef = useRef()
    const { currentUser, updateName, updateEmail, updatePassword, updateProfilePicture } = useAuth()
    const[error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const history = useHistory()

    const [file, setFile] = useState("")
    const [url, setURL] = useState("")

    const user = localStorage.getItem('user')
    console.log(user)


    function handleSubmit (e){
        e.preventDefault()
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return  setError('The Passswords Do Not Match')
        }

        const promises = []
        setLoading(false)
        setError('')
        if ((nameRef.current.value)){
            promises.push(updateName(nameRef.current.value))
        }
        if (emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        if (pictureRef.current.value){
            
        storage.ref(`/images/${file.name}`).put(file)
        .on("state_changed", console.log("success"), alert, () => {
          // Getting Download Link
          storage.ref("images").child(file.name).getDownloadURL()
            .then((url) => {
              setURL(url);
              console.log('url is ' + url)
              promises.push(updateProfilePicture(url))
            }).then(() => {
                
                history.push('/')
                window.location.reload();
            })
        });

        const storing = database.ref(`/blogs`).orderByChild('postedByUid').equalTo(currentUser.uid)
                storing.once("value", function(snapshot){
                    snapshot.forEach(function(child){
                        child.ref.update({
                            postedByUid: currentUser.uid,
                            postedByName: currentUser.displayName,
                            postedByProfilePic: currentUser.photoURL
                        })
                    })
                })
            
        // promises.push(updateProfilePicture(url))
        }

        Promise.all(promises).then(() => {
        //     storage.ref(`/images/${file.name}`).put(file)
        // .on("state_changed", console.log("success"), alert, () => {
        //   // Getting Download Link
        //   storage.ref("images").child(file.name).getDownloadURL()
        //     .then((url) => { 
        //       setURL(url);
        //       console.log('url is ' + url)
              
        //     console.log(JSON.stringify(currentUser))
        //     })
        // });
        setLoading(true);
            
        }).then(() => {
            
        history.push('/')
        window.location.reload();
        }).
        catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
        // setLoading(false)
        
                console.log('url first is ' + url)
                // history.push('/')
                // window.location.reload()
                // console.log(JSON.stringify(currentUser))
        
    }



    
    return (
        <Container>
                {/* <Header urlvar={url}/> */}
                <RegisterContainer>
                    <h3>Update Profile</h3>
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
                        <Name>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text"  ref={nameRef} defaultValue ={user.displayName} /> 
                        </Name>
                        <Email>
                            <label htmlFor="email">Email Address</label>
                            {/* <p>{currentUser.email}</p> */}
                            <input id="email" type="email" ref={emailRef} defaultValue={user.email} />
                        </Email>
                        
                        <Submit>
                            <button disabled={loading} type="submit" >Update Profile</button>
                        </Submit>

                    </form>
                    <CancelText>
                        <h6> <Link to="/">Cancel</Link></h6>
                    </CancelText>
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
const Name = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    height: 30px;
`
const Email = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    height: 30px;

    p{
        width: 250px;
        margin-right: 10px;
        font-size: 15px;
        
    }
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
const CancelText = styled.div`
    text-align: center;
    font-size: 17px;
    margin-top: 5px;
    h6{
        a{
            text-decoration: underline;
            cursor: pointer;
        }
    }
`
const UploadImage = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    height: 30px;
    
    label{
        display: flex;
        align-items: center;
        margin-left: 10px;

    }
    
    input[type="file"]{
        
    }
        
    
`