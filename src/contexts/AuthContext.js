import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    function signup(email, password){
        
        auth.createUserWithEmailAndPassword(email, password)

    }

    function login(email, password){
        
        return auth.signInWithEmailAndPassword(email, password)
            
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function updateName(name){
        return currentUser.updateProfile({
            displayName: name
        })
    }
    function updateProfilePicture(profilePicture){
        return currentUser.updateProfile({
            photoURL: profilePicture
        })
    }
    function setIsAdminFunction(isAdmin){
        return currentUser.updateProfile({
            providerData : {
                isAdmin: isAdmin
            } 
            
        })
        // return currentUser.providerData[0].isAdmin = isAdmin
    }
    function setIsDisabledFunction(isDisabled){
        // return currentUser.updateProfile({
        //     isDisabled: isDisabled
        // })
        // return currentUser.providerData[0].isDisabled = isDisabled
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)

            // if(user.email == "ishaq.kassam@gmail.com"){
            //     currentUser.providerData[0].isAdmin = "true"
            // }
            // else{
            //     currentUser.isAdmin = "false"
            // }

            // currentUser.isDisabled = "false"
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser, 
        login,
        signup,
        logout,
        resetPassword,
        updateName,
        updateEmail,
        updatePassword,
        updateProfilePicture, 
        setIsAdminFunction,
        setIsDisabledFunction
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
