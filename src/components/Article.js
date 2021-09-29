import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Footer from './Footer'
import SearchIcon from '@material-ui/icons/Search';
import { database } from '../firebase';
import BlogDataService from "../firebaseDatabase";
import { useAuth } from '../contexts/AuthContext'

function Article() {

    const [blogs, setBlogs] = useState([])
    const [currentBlog, setCurrentBlog] = useState({})
    const [filter, setFilter] = useState("")
    const history = useHistory()
    const searchRef = useRef()
    const { currentUser, logout } = useAuth()
    
        const blog = BlogDataService.getAll()
        useState(() => {

            const storing = database.ref(`/blogs`)
            const key = storing.key
            storing.on('value', snapshot => {
                let allBlogs = [];
                snapshot.forEach(snap => { 
                    allBlogs.push(snap.val())
                })
                setBlogs(allBlogs)
                
            })

        database.ref(`/blogs`).orderByChild('postedByUid').equalTo(currentUser.uid).once("value", function(snapshot){
            snapshot.forEach(function(child){
                child.ref.update({
                    postedByUid: currentUser.uid,
                    postedByName: currentUser.displayName,
                    postedByProfilePic: currentUser.photoURL
                })
            })
        })
        })

        const handleChange = () => {
            setFilter(searchRef.current.value.toLowerCase())
            handleSearch()
        }

        const handleSearch = () => {
            console.log(searchRef.current.value)
            setFilter(searchRef.current.value.toLowerCase())
        }

    return (
            <Container>
                <LeftSide>
                    <ArticleSearchbar>  
                        <Bar >
                            <form onSubmit={handleSearch}>
                                <SearchIcon type="submit"/>
                                <input type="text" ref={searchRef} onChange={handleChange} placeholder="Search Article by Title..."/> 
                            </form>
                        </Bar> 
                    </ArticleSearchbar>
                
                <Articles>
                    
                {filter ? 
                    // blogs.filter(filteredblog => filteredblog.heading == filter).slice(0).reverse().map((blog, key) => (
                    blogs.filter(filteredblog => filteredblog.heading.toLowerCase().includes(filter)).slice(0).reverse().map((blog, key) => (
                        <ArticleCard key={key} onClick={() => {
                            localStorage.setItem('blog', JSON.stringify(blog))
                                history.push(`/blog:${blog.blogId}`)
                            
                        }
                        }>
                            
                            <ArticleTextDetails>                        
                                <Author>
                                    <AuthorProfilePicture>
                                    {
                                        blog.postedByProfilePic ? 
                                        <img src={blog.postedByProfilePic} alt="" /> :
                                        <AccountCircleIcon className="icon"/>
                                    }
                                        
                                    </AuthorProfilePicture>
                                    <AuthorUserName>
                                        {blog.postedByName ? blog.postedByName : blog.postedByEmail}
                                        <p>{blog.postedByEmail && blog.postedByEmail}</p>
                                    </AuthorUserName>
                                </Author>

                                <ArticleTitle>
                                    {blog.heading}
                                </ArticleTitle>
                                            
                                <ArticleSubTitle>
                                    {blog.subHeading}
                                </ArticleSubTitle>

                                <ArticleFooter>
                                    <ArticleDatePosted>
                                        <p>{blog.datePosted}</p>
                                    </ArticleDatePosted>
                                    <ArticleClassTag>
                                        <p>{blog.Bclass}</p>
                                    </ArticleClassTag>
                                    <ArticleSubjectTag>
                                        <p>{blog.subject}</p>
                                    </ArticleSubjectTag>
                                    <ArticleTopicTag>
                                        <p>{blog.level}</p>
                                    </ArticleTopicTag>
                                    
                                </ArticleFooter>
                                
                            </ArticleTextDetails>

                            <ArticlePicture>
                                <img src="images/logo.png" alt="" />
                            </ArticlePicture>
                        </ArticleCard>
                )) :
                    blogs.slice(0).reverse().map((blog, key) => (
                        <ArticleCard key={key} onClick={() => {
                            localStorage.setItem('blog', JSON.stringify(blog))
                                history.push(`/blog:${blog.blogId}`)
                            
                        }
                        }>
                            
                            <ArticleTextDetails>                        
                                <Author>
                                    <AuthorProfilePicture>
                                    {
                                        blog.postedByProfilePic ? 
                                        <img src={blog.postedByProfilePic} alt="" /> :
                                        <AccountCircleIcon className="icon"/>
                                    }
                                        
                                    </AuthorProfilePicture>
                                    <AuthorUserName>
                                        {blog.postedByName ? blog.postedByName : blog.postedByEmail}
                                        {/* <p>{blog.postedByEmail && blog.postedByEmail}</p> */}
                                    </AuthorUserName>
                                </Author>

                                <ArticleTitle>
                                    {blog.heading}
                                </ArticleTitle>
                                            
                                <ArticleSubTitle>
                                    {blog.subHeading}
                                </ArticleSubTitle>

                                <ArticleFooter>
                                    <ArticleDatePosted>
                                        <p>{blog.datePosted}</p>
                                    </ArticleDatePosted>
                                    <ArticleClassTag>
                                        <p>{blog.Bclass}</p>
                                    </ArticleClassTag>
                                    <ArticleSubjectTag>
                                        <p>{blog.subject}</p>
                                    </ArticleSubjectTag>
                                    <ArticleTopicTag>
                                        <p>{blog.level}</p>
                                    </ArticleTopicTag>
                                    
                                </ArticleFooter>
                                
                            </ArticleTextDetails>

                            <ArticlePicture>
                                <img src="images/logo.png" alt="" />
                            </ArticlePicture>
                        </ArticleCard>
                ))
            }
                </Articles>
        </LeftSide>

                <RightSideBar>
                    <Advert>
                        <img src="images/logo.png" alt="" />
                    </Advert>
                    <Footer/>
                </RightSideBar>
            </Container>
    );
}

export default Article

const Container = styled.div`
    height: 85vh;
    padding: 10px 100px; 
    display: flex;
    justify-content: space-between;
`
const LeftSide = styled.div`
    width: 60%;
    /* border: 1px solid grey; */
`
const Articles = styled.div`
    height: 98%;
    width: 100%;
    overflow-y: scroll;
    /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */

    ::-webkit-scrollbar{
        display: none;
    }
`
const ArticleSearchbar=styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    
`
const Bar = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #0582c3;
    width: 70%;
    padding: 5px;
    border-radius: 15px;
    color: #0582c3;

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;

        input{
        border: none;
        margin-left: 10px;
        outline: none;
        width: 100%;

        :hover{
            outline: none;
            cursor: text;
        }
    }
}
`

const ArticleCard = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
    height: 170px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
const ArticleTextDetails = styled.div`
    padding: 20px 20px;
    width: 60%;
`
const Author = styled.div`
    display: flex;
    align-items: center;
`
const AuthorProfilePicture = styled.div`
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #0582c3;
    width: 30px;
    height: 30px;
    margin-right: 8px;

    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
    }
    .icon{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
`
const AuthorUserName = styled.div`
    font-size: 13px;
`
const ArticleTitle = styled.div`
    margin-top: 14px;
    font-weight: bold;
    font-size: 24px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const ArticleSubTitle = styled.div`
    font-size: 14px;
    overflow: hidden;

` 
const ArticleFooter = styled.div`
    display: flex;
    font-size: 11px;
    margin-top: 30px;
    width: 100%;
    justify-content: space-around;
    color: grey;
    
    overflow: hidden;

    p{
        padding: 4px;
    }
`
const ArticleDatePosted = styled.div`
    font-size: 11px;
    overflow: hidden;
    
`
const ArticleClassTag = styled.div`
overflow: hidden;
`
const ArticleSubjectTag = styled.div`
overflow: hidden;
`
const ArticleTopicTag = styled.div`
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
//END OF ARTICLE TEXT DESCRIPTIONS STYLING
const ArticlePicture = styled.div`
    img{
        height: 100%;
    }
`

const RightSideBar = styled.div`
    width: 30%;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    display: relative;
`
const Advert = styled.div`
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
    }
`