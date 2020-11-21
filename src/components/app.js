import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import styled from 'styled-components'

// import components
import NavSection from './nav'
import SubNavSection from './features/landing/sub_nav'
import HeroTextSection from './features/landing/hero_text'
import PlayerSection from './features/landing/player'
import PageNumberSection from './features/landing/page_number';
import AboutUsSection from './features/about_us'
import ContactUsSection from './features/contact_us'

const IS_DEV = false
const COLOR_CODE = ['#3CDCB5', '#FF8AE1', '#FFD764', '#B296CC','#006584']
const MAX_PAGE = COLOR_CODE.length

const Main = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`

const Content = styled.div`
	width: 87.5%;
	height: 300vh;
`

const Landing = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-image: url('/assets/img/page_${props => props.page}.jpg');
	background-size: cover;
	transition: background-image 0.3s ease-in-out;
`

const AboutUs = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url('/assets/about_us/bg.jpg');
	background-size: cover;
	position: relative;
	z-index:1;
`

const ContactUs = styled.div`
	width: 100%;
	height: 100vh;
	background-color: black;
	position: relative;
`

const Section = styled.section`
	width: 85.5%;
	height: 100%;
	position: relative;
`

const RightSideBar = styled.aside`
	width: 15%;
	height:100%;
`

const Arrow = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	width: 7.5%;
	height: 1.1vw;
	left: 84%;
	top: 63%;
`

const App = () => {
	// transition handle section
	const [shouldTrigger, setShouldTrigger] = useState(false)
	const [shouldReverse, setShouldReverse] = useState(false)
	const [hideNormal, setHideNormal] = useState(false)
	const [hideReverse, setHideReverse] = useState(true)

	useEffect(() => {
		hideNormal ? setShouldTrigger(false) : setShouldTrigger(true)
	}, [hideNormal])

	useEffect(() => {
		hideReverse ? setShouldReverse(false) : setShouldReverse(true)
	}, [hideReverse])

	// page handle section
	const [page, setPage] = useState(1)
	const increment = () => setPage((page + 1) % MAX_PAGE || MAX_PAGE);
	const decrement = () => setPage((page - 1) % MAX_PAGE || MAX_PAGE);

	// scroll to page handle section
	const domMapping = {
		landingPage: useRef(null),
		aboutUsPage: useRef(null),
		contactUsPage: useRef(null),
	}
	const executeScroll = (domId) => {
		domMapping[domId].current.scrollIntoView({behavior: 'smooth'})
	}

	// scroll position
	const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('contextmenu', function (e) { 
			e.preventDefault(); 
		  }, false);

        return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('contextmenu');
        };
    }, []);

	return (
		<div>
		{/* <img src="/assets/img/sample.png" style={{height:'100%', width:'100%', opacity:'100%', position: 'absolute', top:0, left:0}} /> */}
		{/* <img src="/assets/about_us/sample.jpg" style={{height:'100%', width:'100%', opacity:'100%', position: 'absolute', top:0, left:0}} /> */}
		{/* <img src="/assets/contact_us/sample.jpg" style={{height:'100%', width:'100%', opacity:'100%', position: 'absolute', top:0, left:0}} /> */}
	<Main>
		<SubNavSection scrollPosition={scrollPosition}/>
		<Content>
			{/* Landing Page Start */}
			<Landing page={page} ref={domMapping.landingPage}>
				<Section>
					<HeroTextSection {...{shouldReverse, shouldTrigger, hideReverse, hideNormal, page, setHideNormal, setHideReverse, MAX_PAGE}}/>
					<PageNumberSection {...{shouldReverse, shouldTrigger, hideReverse, hideNormal, page, setHideNormal, setHideReverse, MAX_PAGE, IS_DEV, COLOR_CODE}} />
					<Arrow>
						<img src='/assets/icons/left_arrow.svg' onClick={() => {decrement(); setHideReverse(false)}} style={{height: '100%'}} />
						<img src='/assets/icons/rifht_arrow.svg' onClick={() => {increment();setHideNormal(false)}} style={{height: '100%'}} />
					</Arrow>
					<PlayerSection {...{hideNormal, hideReverse,page, shouldTrigger, shouldReverse, MAX_PAGE}}/>
				</Section>
				<RightSideBar />
			</Landing>
			{/* Landing Page End */}
			{/* About Us Start */}
			<AboutUs ref={domMapping.aboutUsPage}>
				<AboutUsSection />
			</AboutUs>
			{/* About Us End */}
			{/* Contact Us Start */}
			<ContactUs ref={domMapping.contactUsPage}>
				<ContactUsSection />
			</ContactUs>
			{/* Contact Us End */}
		</Content>
		
		<NavSection scrollToFunc={executeScroll} scrollPosition={scrollPosition} />
	</Main>
	</div>
	)
}

export default App;
