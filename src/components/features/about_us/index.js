import {useEffect} from 'preact/hooks'
import styled, {css} from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
const IS_DEV = false

const Main = styled.img.attrs(() => ({src: '/assets/about_us/text1.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 21.5%;
    left: 14.5%;
    height: 17%;
    width: 20%

    ${() => IS_DEV && css`border: red 1px solid; filter: grayscale(50%);`}
`

const Slogan = styled.img.attrs(() => ({src: '/assets/about_us/slogan.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 32%;
    left: 46.8%;
    height: 6%;

    ${() => IS_DEV && css`border: green 1px solid;`}
`

const Paragraph = styled.img.attrs(() => ({src: '/assets/about_us/text2.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 52.5%;
    left: 15%;
    height: 35.5%;
    width: 63%;

    ${() => IS_DEV && css`border: yellow 1px solid;`}
`

const HorizontalLine = styled.img.attrs(() => ({src: '/assets/about_us/line_short.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 35%;
    left: 38.4%;
    width: 5.9%;

    ${() => IS_DEV && css`border: blue 1px solid;`}
`

const VerticalLine = styled.img.attrs(() => ({src: '/assets/about_us/line_long.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 80.6%;
    left: 80.9%;
    height: 17vw;

    ${() => IS_DEV && css`border: orange 1px solid;`}
`

const Dot = styled.img.attrs(() => ({src: '/assets/about_us/dot.png', "data-aos": "fade-up"}))`
    position: absolute;
    top: 37%;
    left: 35.1%;
    height: 1.2%;

    ${() => IS_DEV && css`border: pink 1px solid;`}
`

const AboutUsSection = () => {
    useEffect(() => {
		AOS.init({duration: 1500})
    }, [])
    
    return(
        <>
            <Main />
            <Dot />
            <Slogan />
            <Paragraph />
            <HorizontalLine/>
            <VerticalLine />
        </>
    )
}

export default AboutUsSection