import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';

const Nav = styled.div`
	width: 16%;
	// width: 12.5%;
	background-color: black;
	display: flex;
	flex-direction: column;
	padding-left: 4.27%;
	justify-content: space-between;
	height: 100vh;
	position: fixed;
	top: 0;
	left:0;
	margin-right: 41px;
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
	padding-bottom: 40px;
`

const SocialLogo = styled.div`
	margin-bottom: 50%;
	display: flex;
	justify-content: space-between;
	width: 50%;
	height: 1.55vw;
`

// only for link list item, not related to scroll to scroll to tab
const SUBPAGE_INFO = [
	{name: 'the_incredibles', label: 'the incredibles'},
	{name: 'music_video', label: 'music video'},
	{name: 'commercial', label: 'commercial'},
	{name: 'documentary', label: 'documentary'},
	{name: 'farce', label: 'farce'},
]

const NavSection = ({scrollToFunc, scrollPosition, landingSubPage, setLandingSubPage}) => {
	const [activePage, setActivePage] = useState('landingPage')

	useEffect(() => {
		// index only would be 0,1,2
		const currentClientVH = window.innerHeight
		const index = Math.round(scrollPosition / currentClientVH)
		switch (index) {
			case 0:
				setActivePage('landingPage');
				break;
			case 1:
				setActivePage('aboutUsPage')
				break
			case 2:
				setActivePage('contactUsPage')
				break
			default:
				setActivePage('landingPage');
		}
		// if(PAGE_INFO[index].name !== activePage) setActivePage(PAGE_INFO[index].name)
	}, [scrollPosition])
	
    const onPress = (pageName) => {
		scrollToFunc(pageName)
		setActivePage(pageName)
	} 

    return (
        <Nav>
            <Logo><img src='/assets/icons/logo.svg' style={{height: '100%'}} /></Logo>
			<div>
				<Links>
					{/* {PAGE_INFO.map(({name, label}) => (<LinkItems active={activePage === name} onClick={() => onPress(name)}>{label.toUpperCase()}</LinkItems>))} */}
					{/* <LinkItems active={activePage === 'landingPage'} onClick={() => onPress('landingPage')}>DOCUMENTRY</LinkItems>
					<LinkItems active={activePage === 'videoPage'} onClick={() => onPress('videoPage')}>MUSIC VIDEOS</LinkItems> */}
					{SUBPAGE_INFO.map(({name, label}) => (<LinkItems active={activePage === 'landingPage' && landingSubPage === name} onClick={() => {onPress('landingPage'); setLandingSubPage(name)}}>{label.toUpperCase()}</LinkItems>))}
					<LinkItems active={activePage === 'aboutUsPage'} onClick={() => onPress('aboutUsPage')}>WHO ARE WE</LinkItems>
					<LinkItems active={activePage === 'contactUsPage'} onClick={() => onPress('contactUsPage')}>GET IN TOUCH</LinkItems>
            	</Links>
			</div>
            <SocialLogo>
				<a href="https://www.instagram.com/provit_hk/" target="_blank"><img src='/assets/icons/ig.svg' style={{height: '100%'}} /></a>
				<a href="https://www.facebook.com/PROVITHK/" target="_blank"><img src='/assets/icons/fb.svg' style={{height: '100%'}} /></a>
            </SocialLogo>
        </Nav>
    )
}

export default NavSection