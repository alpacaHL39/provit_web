import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';

const Nav = styled.div`
	width: 12.5%;
	background-color: black;
	display: flex;
	flex-direction: column;
	padding-left: 4.27%;
	justify-content: space-between;
	height: 100vh;
	position: fixed;
	top: 0;
	left:0;
`

const Logo = styled.div`
	margin-top: 21.5%;
	height: 3vw;
`

const Links = styled.div`
	margin-top: 11%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 16.7%;
`

const LinkItems = styled.p`
	color: ${({active}) => active ? 'white' : 'dimgrey'};
	font-size: 0.9vw;
	font-family: 'Avenir';
    font-weight: ${props => props.active ? 700 : 400};
    cursor: pointer;
    transition: 0.5s;
`

const SocialLogo = styled.div`
	margin-bottom: 50%;
	display: flex;
	justify-content: space-between;
	width: 65%;
	height: 1.55vw;
`

const PAGE_INFO = [
	{name: 'landingPage', label: 'DOCUMENTRY'},
	// {name: 'videoPage', label: 'MUSIC VIDEOS'},
	{name: 'aboutUsPage', label: 'WHO ARE WE'},
	{name: 'contactUsPage', label: 'GET IN TOUCH'},
]

const NavSection = ({scrollToFunc, scrollPosition}) => {
	const [activePage, setActivePage] = useState('landingPage')

	useEffect(() => {
		const currentClientVH = window.innerHeight
		const index = Math.round(scrollPosition / currentClientVH)
		if(PAGE_INFO[index].name !== activePage) setActivePage(PAGE_INFO[index].name)
	}, [scrollPosition])
	
    const onPress = (pageName) => {
		scrollToFunc(pageName)
		setActivePage(pageName)
	} 

    return (
        <Nav>
            <Logo><img src='/assets/icons/logo.svg' style={{height: '100%'}} /></Logo>
            <Links>
				{PAGE_INFO.map(({name, label}) => (<LinkItems active={activePage === name} onClick={() => onPress(name)}>{label}</LinkItems>))}
                {/* <LinkItems active={activePage === 'landingPage'} onClick={() => onPress('landingPage')}>DOCUMENTRY</LinkItems>
                <LinkItems active={activePage === 'videoPage'} onClick={() => onPress('videoPage')}>MUSIC VIDEOS</LinkItems>
                <LinkItems active={activePage === 'aboutUsPage'} onClick={() => onPress('aboutUsPage')}>WHO ARE WE</LinkItems>
                <LinkItems active={activePage === 'contactUsPage'} onClick={() => onPress('contactUsPage')}>GET IN TOUCH</LinkItems> */}
            </Links>
            <SocialLogo>
                <img src='/assets/icons/ig.svg' style={{height: '100%'}} />
                <img src='/assets/icons/fb.svg' style={{height: '100%'}} />
            </SocialLogo>
        </Nav>
    )
}

export default NavSection