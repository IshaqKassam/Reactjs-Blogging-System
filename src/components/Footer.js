import React from 'react'
import styled from 'styled-components'
// import AccessTimeIcon from '@material-ui/icons/AccessTime';
import InstagramIcon from '@material-ui/icons/Instagram';
import CopyrightIcon from '@material-ui/icons/Copyright';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
function Footer() {
    return (
        <Container>
            <Contact>
                <Phone>
                    <PhoneIcon className="social-media-icon"/>
                    <p>+254 701 234 567</p>
                </Phone>
                <Email>
                    <MailIcon className="social-media-icon"/>
                    <p>info@webapp.com</p>
                </Email>
            </Contact>

            <SocialMedia>
                <InstagramIcon className="social-media-icon"/>
                <LinkedInIcon className="social-media-icon"/>
                <FacebookIcon className="social-media-icon"/>
                <TwitterIcon className="social-media-icon"/>
            </SocialMedia>
        
            <CopyRight>
                <CopyrightIcon/>
                Copyright
            </CopyRight>
        </Container>
    )
}

export default Footer

const Container = styled.section`
    border-top: 1px solid black;
    position: relative;
    bottom: 0;
    padding: 5px;
    color: #0582c3;
`
const Contact = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-around;
`
const Phone = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;

`
const Email = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
`

const SocialMedia = styled.div`
    margin: 20px 0 0 0;
    /* padding: 10px ; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    /* border: 1px solid black; */
    text-align: center;
    align-items: center;

    .social-media-icon {
        cursor: pointer;

        :hover{
        color: grey;
        cursor: pointer;
        }
    }
`
const CopyRight = styled.div`
    border-top: 1px solid lightgrey;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    margin: 30px 4% 0 4%;
`