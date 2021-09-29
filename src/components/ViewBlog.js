import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from './Header'
// import   {htmlToText}  from 'html-to-text'


import JoditEditor from 'jodit-react'

export default function ViewBlog() {

    const [currentBlog, setCurrentBlog] = useState({})
    const blog = localStorage.getItem('blog')
    const config = {
        readonly: true
    }
    

    useEffect(() =>{
        setCurrentBlog(JSON.parse(blog))
    }, [])

    console.log(blog.blog)

    // var htmlString = currentBlog.blog.getPlaintext();
// var plainString = htmlString.html().replace(/<[^>]+>/g, '');
    
    // var strippedHtml = currentBlog.blog.replace(/<[^>]+>/g, '');
    // const text = htmlToText(currentBlog.blog, {
    //     wordwrap: 130
    // });
    
    // console.log(blog.topic)
    return (
        <Container>
            {
            console.log(JSON.parse(blog))
            
            }

<Header/> 

<WritePostContainer>
    
        <AuthorDetails>

        </AuthorDetails>
    
        <Title>
            <h2 >{currentBlog.heading}</h2>
        </Title>

        <SubTitle>
            <h4 >{currentBlog.subHeading}</h4>
        </SubTitle>

        <Horizontal>
        <DropDown>
            <BlogLevel> 
                <p>Level:</p>
                <p>{currentBlog.level}</p>
            </BlogLevel>

            <BlogClass> 
                <p>Class:</p>
                <p>{currentBlog.Bclass}</p>                            
            </BlogClass>

            <BlogSubject> 
                <p>Subject:</p>
                <p>{currentBlog.subject}</p>
            </BlogSubject>
            </DropDown>

            {/* <BlogSubjectTopic>
                <p>Topic:</p>
                <p>{currentBlog.topic}</p>
            </BlogSubjectTopic> */}
        
        </Horizontal>

        

        <BlogContent>
        {/* <JoditEditor
                        // ref={blogRef}
                        value={currentBlog.blog}
                        config={config}
                        // onChange={handleBlogContentChange}
            /> */}
            {/* {currentBlog.blog} */}
            <div dangerouslySetInnerHTML={{__html: currentBlog.blog}} />
        </BlogContent>

        
</WritePostContainer>
</Container>
        
    )
}

const Container = styled.div`

`
const WritePostContainer = styled.div`
    border: 1px solid grey;
    margin: 30px;
    padding: 30px;
`
const AuthorDetails = styled.div`

`

const Title = styled.div`
    /* width: 100%; */
    /* border: 1px solid grey; */
    /* display: flex;
    justify-content: center; */
    margin-bottom: 10px;

    input{
        width: 60%;
        font-size: 24px;
        padding: 5px;
        font-weight: bold;

        :focus{
        outline: none;
        }
    }
    
`
const SubTitle = styled.div`
    display: flex;

    input{
        width: 100%;
        font-size: 18px;

        :focus{
            outline: none;
        }
    } 
`
const Horizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
/* 
    p{
        background-color: lightgrey;
        padding: 5px;
        border-radius: 10px;
    } */
    /* border: 1px solid grey; */
`
const DropDown = styled.div`
    display: flex;
    /* border: 1px solid grey; */
    justify-content: space-between;
    width: 50%;
    flex-wrap: wrap;
    margin: 10px 0;
`
const BlogLevel = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }
`
const BlogClass = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }
`
const BlogSubject = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }

    textarea{
        width: 100%;
    }
`
const BlogSubjectTopic = styled.div`
    display: flex;
    width: 40%;
    margin-left: 40px;
    p{
        margin-right: 10px;
    }
    input{
        width: 100%;
    }
`
const BlogContent = styled.div`
    overflow-y: scroll;
    display: flex;
    margin-top: 40px;
    /* border: 1px solid grey; */
        /* padding: 30px; */


    ::-webkit-scrollbar{
        display: none;
    }

    textarea{
        width: 100%;
        bottom: 0;
        border: 1px solid grey;
        padding: 30px;

        :focus{
            outline: none;
        }
    }
`
// const PostButton = styled.div`
//     margin-top: 20px;
//     text-align: center;
// `