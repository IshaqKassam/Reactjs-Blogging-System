import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory, Link, useLocation } from 'react-router-dom'
// import { storage } from '../firebase'
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import useDropdownMenu from 'react-accessible-dropdown-menu-hook'; //installed via 'npm install react-accessible-dropdown-menu-hook'

import { useAuth } from '../contexts/AuthContext'

import { database } from '../firebase';
// import Admin from './Admin'

function Header(props) {

    const [error, setError] = useState("")
    // const [userDb, setUserDb] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const location = useLocation()

    const { pathname } = location

    const splitLocation = pathname.split("/")

    const [userObject, setUserObject] = useState("")
    const [userAdmin, setUserAdmin] = useState("")

    console.log(JSON.stringify(currentUser))
    
    const user = database.ref('/users/' + currentUser.uid)

    const isAdminUser = database.ref("admin")
        .child(currentUser.uid)
    
        console.log(isAdminUser)
    // useEffect(() =>{
    //     const data = {
    //         uid: currentUser.uid,
    //         displayName: currentUser.displayName,
    //         photoURL: currentUser.photoURL,
    //         email: currentUser.email,
    //         emailVerified: currentUser.emailVerified,
    //         phoneNumber: currentUser.phoneNumber,
    //         isAnonymous: currentUser.isAnonymous,
    //         tenantId: currentUser.tenantId,
    //         isAdmin: userObject.isAdmin ? userObject.isAdmin : false,
    //         isDisabled: userObject.isDisabled ? userObject.isDisabled : false
    //     }
    //     user.set(data)
    //     console.log("Uploaded a user to database successfully")
    // }, [])
    
    
    
    const handleLogout = async () => {
        setError('')

        try{
            await logout()
            history.push('/login')
        }
        catch{
            setError('Failed to log out')
        }
    }

    
    useEffect(() => {
        
        database.ref("users")
        .child(currentUser.uid)
        .once("value")
        .then((snapshot) => {
            const value = snapshot.val()
            setUserObject(value)
         })
        .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         }));

    }, [])


    useEffect(() => {
        
        isAdminUser.once("value")
        .then((snapshot) => {
            const value = snapshot.val()
            setUserAdmin(value)
            console.log(value)
         })
        .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         }));

    }, [])

        console.log("the current user from the realtime database is as below")
        console.log(JSON.stringify(userObject))
        console.log(JSON.stringify(userAdmin))
        
    
    useEffect(() => {
        database.ref("users")
        .child(currentUser.uid)
        .once("value")
        .then((snapshot) => {
            const value = snapshot.val()
            setUserObject(value)
            // console.log(userObject)
         })
        .catch(error => ({
           errorCode: error.code,
           errorMessage: error.message
         }));

    }, [])


       console.log(JSON.stringify(userObject))
        
    

    return (
        <ParentContainer>
            <Container>
                <Logo>
                    <img src='/images/logo.png' /> 
                </Logo>

                <Links>

                    <NavigationLinks>
                        <p className={splitLocation[1] === "" ? "active" : ""}><Link to="/">Home</Link></p>
                        {/* <p className={splitLocation[1] === "about" ? "active" : ""}><Link to="/about">About</Link> </p> */}
                        {/* <p className={splitLocation[1] === "subjects" ? "active" : ""}><Link to="subjects">Levels</Link> </p> */}
                        <p className={splitLocation[1] === "create-post" ? "active" : ""}> <Link to="/create-post">Write</Link> </p>
                        <p className={splitLocation[1] === "myblogs" ? "active" : ""}> <Link to="/myblogs">My Blogs</Link> </p>
                        {
                            userAdmin && 
                            <p className={splitLocation[1] === "admin" ? "active" : ""}> <Link to="/admin">Admin</Link> </p>
                        }
                        
                    </NavigationLinks>

                    <Profile>
                        {/* <UserName>
                            <h5>{currentUser.displayName ? currentUser.displayName : currentUser.email}</h5>
                        </UserName> */}
                        <UserIcon >
                            {
                                    currentUser.photoURL ? 
                                    <img src={currentUser.photoURL}></img> :
                                    <AccountCircleIcon className="icon"/>
                                    // <img src={props.urlvar}></img> 
                            }
                            <Hover>
                                <UserName>
                                    <h5>{currentUser.displayName}</h5>
                                    {/* <h5>Somthing</h5> */}
                                </UserName>
                                <UpdateProfileButton >
                                    <Link to="/update-profile">Update Profile</Link>
                                </UpdateProfileButton>
                                {/* <MyBlogs >
                                    <Link to='/myblogs'>My Blogs</Link>
                                </MyBlogs> */}
                                {/* {
                                 
                                    userAdmin && 
                                    <Admin>
                                        <p> <Link to='/admin'>Admin</Link></p>
                                    </Admin>
                                    
                                } */}
                                <SignOut onClick={handleLogout}>
                                    <a>Sign out</a>
                                </SignOut>
                                
                            </Hover>
                            
                        </UserIcon>
                        
                    </Profile>
                </Links>
            </Container>
        </ParentContainer>
    )
}

export default Header

const ParentContainer = styled.div`
    /* position: absolute;
    width: 100%;
    height: 60px; */
`
const Container = styled.section`
    height: 60px;
    /* margin-top: 60px; */
    padding: 5px 100px;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
`
const Logo = styled.div`
    width: 60px;
    height: 60px; 
    overflow: hidden;
    display: flex;
    border-radius: 15px;

    img{
        width: 100%;
        transform: scale(1.8);
    }
`
const Links = styled.div`
    display: flex;
    /* border: 1px solid grey; */
    width: 40%;
    justify-content: space-between;

`
const NavigationLinks = styled.div`
    /* border: 1px solid grey; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;

    a{
        cursor: pointer;
    }

    .active a{
        border-bottom: 1px solid #0582c3;
        color: #0582c3;
    }
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
`
const Hover = styled.div`
    position: absolute;
    top: 56px;
    right: 52px;
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: none;
    border: 1px solid black;
    padding: 5px;
    display: none;
    /* height: 100px; */
    /* width: 120px; */
    background-color: white;
`

const UpdateProfileButton = styled.div`
    width: 100%;
    margin-top: 5px;
    text-align: center;
    border-bottom: 3px solid #0582c3;

    :hover{
        /* background-color: lightgrey; */
        color: #0582c3;
    }

    a{
        :hover{
            cursor: pointer;
            color: #0582c3;
        }
    }
`

const SignOut = styled.div`
    width: 100%;
    margin-top: 5px;
    text-align: center;
    cursor: pointer !important;

    a{
        :hover{
            cursor: pointer;
            color: #0582c3;
        }
    }
    :hover{
        /* background-color: lightgrey; */
        color: #0582c3;
    }
    
`

const UserIcon = styled.div`
    margin-left: 5px;
    margin-right: 10px;

    .icon{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        color: #0582c3;
    }

    img{
        width: 35px;
        border: 1px solid #0582c3;
        height: 35px;
        border-radius: 50%;
        
    }

    :hover{
        ${Hover}{
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`
const UserName = styled.div`
    /* border: 1px solid grey; */
    margin: 5px 0 !important;
    width: 100%;
    display: flex;
    flex-wrap: start;
    overflow: hidden;
    align-items: center;
    justify-content: center;
`
