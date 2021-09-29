import React, {useState, useRef} from 'react'
import Header from './Header'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// import UpdateProfile from './UpdateProfile'
import { database } from '../firebase';
// import BlogDataService from "../firebaseDatabase";
import { useAuth } from '../contexts/AuthContext'
// import {Pie, Doughnut,} from 'react-chartjs-2'
import SearchIcon from '@material-ui/icons/Search';
import { LineChart, Line, Pie, PieChart, ResponsiveContainer, XAxis,
    YAxis,Legend, Tooltip,
    CartesianGrid } from 'recharts';

export default function Profile() {

    const blogRetrieved = localStorage.getItem('blog')
    const blogToDelete = JSON.parse(blogRetrieved)

    const [blogs, setBlogs] = useState([])
    const [bClass, setbClass] = useState([])
    // const [currentBlog, setCurrentBlog] = useState({})
    const history = useHistory()
    const searchRef = useRef()
    const [filter, setFilter] = useState("")
    
    const { currentUser } = useAuth()
    
        // const blog = BlogDataService.getAll()
        useState(() => {
            const storing = database.ref(`/blogs`).orderByChild('postedByUid').equalTo(currentUser.uid)
            // const storing = database.ref(`/blogs`)
            const key = storing.key
            storing.on('value', snapshot => {
                let allBlogs = [];
                snapshot.forEach(snap => { 
                    allBlogs.push(snap.val())
                })
                setBlogs(allBlogs)
                console.log(storing)
                setbClass(allBlogs.Bclass)
            })
        }, [])
        const rootRef = database.ref(`blogs`)

        const dialogFunction = () => {
        
        }
        
        console.log(blogs.length)
        console.log(blogs.datePosted)



        const distinct = (value, index, self) => {
            return self.indexOf(value) === index
        }

        const distinctClasses = [...new Set(blogs.map(x => x.Bclass))]
        const distinctDates = [...new Set(blogs.map(x => x.datePosted))]
        const distinctSubjects = [...new Set(blogs.map(x => x.subject))]
        const distinctLevels = [...new Set(blogs.map(x => x.level))]
        // const distinctClasses = blogs.filter(distinct)


        //getting the number of blogs for each metric
        const distinctClassesCount = distinctClasses.length
        console.log(distinctClasses)

        const handleChange = () => {
            setFilter(searchRef.current.value.toLowerCase())
            handleSearch()
        }

        const handleSearch = () => {
            console.log(searchRef.current.value)
            setFilter(searchRef.current.value.toLowerCase())
        }

            function findOcc(arr, key){
                let arr2 = [];
                
                arr.forEach((x)=>{
                    
                if(arr2.some((val)=>{ return val[key] == x[key] })){
                    
                    arr2.forEach((k)=>{
                    if(k[key] === x[key]){ 
                        k["occurrence"]++
                    }
                    })
                    
                }else{
                    let a = {}
                    a[key] = x[key]
                    a["occurrence"] = 1
                    arr2.push(a);
                }
                })
                
                return arr2
            }
    console.log(blogs)
    console.log(bClass)

    const BClassCount = findOcc(blogs, "Bclass")
    const levelCount = findOcc(blogs, "level")
    const subjectCount = findOcc(blogs, "subject")
    const dateCount = findOcc(blogs, "datePosted")
    console.log(findOcc(blogs, "Bclass"))
    console.log(distinctClasses)

    return (
        
        <ParentContainer>
            
            <Header/>
            
            {

blogs.length > 0 ?
            <Container>


            <Articles>
                    <ArticleSearchbar>  
                        <Bar >
                            <form onSubmit={handleSearch}>
                                <SearchIcon type="submit"/>
                                <input type="text" ref={searchRef} onChange={handleChange} placeholder="Search Article by Title..."/> 
                            </form>
                        </Bar> 
                    </ArticleSearchbar>
            {filter ? 
                blogs.filter(filteredblog => filteredblog.heading.toLowerCase().includes(filter)).slice(0).reverse().map((blog, key) => (
                    <ArticleCard key={key} >
                        
                        <ArticleTextDetails>                        
                            <AuthorContainer>
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
                                        {/* {blog.dateCreated} */}
                                    </AuthorUserName>
                                </Author>
                                <Buttons>
                                    <p onClick={() => {
                                        localStorage.setItem('blog', JSON.stringify(blog))
                                        history.push(`/edit-blog:${blog.blogId}`)
                                        console.log("edit button selected for" + blog.heading)
                                    }} 
                                    >Edit</p>
                                    <p className="delete" onClick={() => {
                                        localStorage.setItem('blog', JSON.stringify(blog))
                                        console.log("delete button selected for" + blog.heading + "with ID of" + blog.blogId)
                                        const dialog = window.confirm("Are you sure you want to delete?")
                                        if(dialog === true){
                                            console.log("yes, i want to delete")
                                            // const databaseRef = database.ref(`/blogs`)
                                            rootRef.child(blogToDelete.blogId).remove()
                                                .then(() =>{
                                                    console.log("Deleted successfully")
                                                    // console.log(theData)
                                                    alert("Blog Deleted")
                                                }).catch((e)=>{
                                                    console.log(e)
                                                })
                                                // console.log(theData)
                                        }
                                        else{
                                            console.log("No, it was by mistake")
                                            // history.push(`/Profile`)
                                            }
                                    }}>Delete</p>
                                </Buttons>
                            </AuthorContainer>

                            <ArticleTitle onClick={() => {
                        localStorage.setItem('blog', JSON.stringify(blog))
                            history.push(`/blog:${blog.blogId}`)
                        
                    }
                    } >
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
            
            )
            ) :
                blogs.slice(0).reverse().map((blog, key) => (
                    <ArticleCard key={key} >
                        
                        <ArticleTextDetails>                        
                            <AuthorContainer>
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
                                        {/* {blog.dateCreated} */}
                                    </AuthorUserName>
                                </Author>
                                <Buttons>
                                    <p onClick={() => {
                                        localStorage.setItem('blog', JSON.stringify(blog))
                                        history.push(`/edit-blog:${blog.blogId}`)
                                        console.log("edit button selected for" + blog.heading)
                                    }} 
                                    >Edit</p>
                                    <p className="delete" onClick={() => {
                                        localStorage.setItem('blog', JSON.stringify(blog))
                                        console.log("delete button selected for" + blog.heading + "with ID of" + blog.blogId)
                                        const dialog = window.confirm("Are you sure you want to delete?")
                                        if(dialog === true){
                                            console.log("yes, i want to delete")
                                            // const databaseRef = database.ref(`/blogs`)
                                            rootRef.child(blogToDelete.blogId).remove()
                                                .then(() =>{
                                                    console.log("Deleted successfully")
                                                    // console.log(theData)
                                                    alert("Blog Deleted")
                                                }).catch((e)=>{
                                                    console.log(e)
                                                })
                                                // console.log(theData)
                                        }
                                        else{
                                            console.log("No, it was by mistake")
                                            // history.push(`/Profile`)
                                            }
                                    }}>Delete</p>
                                </Buttons>
                            </AuthorContainer>

                            <ArticleTitle onClick={() => {
                        localStorage.setItem('blog', JSON.stringify(blog))
                            history.push(`/blog:${blog.blogId}`)
                        
                    }
                    } >
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
            
            )
            )
        }
            </Articles>
            


            <RightSideBar>
                
                <BlogsStats>
                    <BlogsCount>
                        <p>Total Blogs Written: {blogs.length}</p>
                    </BlogsCount>
                    <p><b>Classes</b></p>
                    {/* <ResponsiveContainer width={450} height={450}> */}
                        <PieChart width={450} height={450}>
                            <Pie
                                data={BClassCount}
                                cx="50%"
                                cy="30%"
                                outerRadius={100}
                                fill="#0192de"
                                dataKey="occurrence"
                                label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index
                                }) => {
                                console.log("handling label?");
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                    x={x}
                                    y={y}
                                    fill="#0192de"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    >
                                    {BClassCount[index].Bclass} ({value})
                                    </text>
                                );
                                }}
                            />
                        </PieChart>
                    {/* </ResponsiveContainer> */}
                    
                    <p><b>Date Posted</b></p>
                    <LineChart 
                        width={400} height={250} data={dateCount}
                        margin={{ top: 20, right: 0, left: 0, bottom: 30 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datePosted" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="occurrence" stroke="#0192de" label />
                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                    {/* <ResponsiveContainer width={400} height={400}> */}

                    <p><b>Levels</b></p>
                        <PieChart width={450} height={450}>
                            <Pie
                                data={levelCount}
                                cx="50%"
                                cy="30%"
                                outerRadius={100}
                                fill="#0192de"
                                dataKey="occurrence"
                                label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index
                                }) => {
                                console.log("handling label?");
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                    x={x}
                                    y={y}
                                    fill="#0192de"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    >
                                    {levelCount[index].level} ({value})
                                    </text>
                                );
                                }}
                            />
                        </PieChart>
                    {/* </ResponsiveContainer> */}

                    {/* <ResponsiveContainer width={450} height={400}> */}
                    <p><b>Subjects</b></p>
                        <PieChart width={450} height={450}>
                            <Pie
                                data={subjectCount}
                                cx="50%"
                                cy="30%"
                                outerRadius={100}
                                fill="#0192de"
                                dataKey="occurrence"
                                label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index
                                }) => {
                                console.log("handling label?");
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text
                                    x={x}
                                    y={y}
                                    fill="#0192de"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    >
                                    {subjectCount[index].subject} ({value})
                                    </text>
                                );
                                }}
                            />
                        </PieChart>
                    {/* </ResponsiveContainer> */}
                </BlogsStats>
            </RightSideBar>
            
        </Container>
        : 
        <p>You dont have any blogs</p>
    }
        
        </ParentContainer>
        
    )
}
const ParentContainer = styled.div`
    p{
        text-align: center;
        padding: 20px;
    }
`
const Container = styled.div`
    height: 150vh;
    padding: 10px 100px;
    display: flex;
    justify-content: space-between;
`
const Articles = styled.div`
    width: 60%;
    height: 250vh;
    overflow-y: scroll;
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
const AuthorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        overflow: hidden;
    }
`
const AuthorUserName = styled.div`
    font-size: 13px;
`
const Buttons = styled.div`
    display: flex;
    width: 17%;
    justify-content: space-between;

    .delete{
            color: red !important;
        }

    p{
        border: 1px solid grey;
        padding: 3px;
        font-size: 13px;
        cursor: pointer;

        :hover{
            background-color: lightgrey;
        }

    }
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

    :hover{
        text-decoration: underline;
        color: darkgrey;
    }
`
const ArticleSubTitle = styled.div`
    font-size: 14px;
` 
const ArticleFooter = styled.div`
    display: flex;
    font-size: 11px;
    margin-top: 30px;
    width: 70%;
    justify-content: space-around;
    color: grey;

    p{
        padding: 4px;
    }
`
const ArticleDatePosted = styled.div`
    font-size: 11px;    
`
const ArticleClassTag = styled.div`
`
const ArticleSubjectTag = styled.div`
`                       
const ArticleTopicTag = styled.div`
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
    height: 150vh;
    padding: 10px 0;
`
const BlogsStats = styled.div`

`
const BlogsCount = styled.div`
    margin: 10px; 
    p:first-of-type{
        font-weight: bold;
    }
`
const Classes = styled.div`
    margin: 10px;
    p:first-of-type{
        font-weight: bold;
    }

    div{
        display: flex;
        justify-content: space-between;
        width: 30%;
    }
`
const DatesWritten = styled.div`
    margin: 10px;
    p:first-of-type{
        font-weight: bold;
    }
`
const Subjects = styled.div`
    p:first-of-type{
        font-weight: bold;
    }
    margin: 10px;
`
const Levels = styled.div`
    p:first-of-type{
        font-weight: bold;
    }
    margin: 10px;
`