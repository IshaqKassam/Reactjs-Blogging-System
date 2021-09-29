import React, {useEffect, useState} from 'react'

import styled from 'styled-components' //installed via "npm install styled-components"
import { Link, useHistory } from 'react-router-dom' //installed via "npm install react-router-dom"
import { useAuth } from '../contexts/AuthContext'

import { database } from '../firebase';

function Wait() {
    
    const { currentUser, logout } = useAuth()
    
const [userObject, setUserObject] = useState("")

const history = useHistory()
// const user = database.ref('/users/' + currentUser.uid)
console.log(userObject.isAdmin)

history.push('/')

useEffect(() => {
    
    const user = database.ref("users")
    .child(currentUser.uid)

    user
    .once("value")
    .then((snapshot) => {
        const value = snapshot.val()
        setUserObject(value)
        // console.log(userObject)
     }).then(() => {
        const data = {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            email: currentUser.email,
            emailVerified: currentUser.emailVerified,
            phoneNumber: currentUser.phoneNumber,
            isAnonymous: currentUser.isAnonymous,
            tenantId: currentUser.tenantId,
            isAdmin: userObject.isAdmin ? userObject.isAdmin : "false",
            isDisabled: userObject.isDisabled ? userObject.isDisabled : "false"
        }
        user.set(data)
        console.log("Uploaded a user to database successfully")


     })
    .catch(error => ({
       errorCode: error.code,
       errorMessage: error.message
     }));

}, [])
    

    history.push('/')

    return (
        <div>
            {/* {window.location.reload()} */}
        </div>
    )
}

export default Wait
