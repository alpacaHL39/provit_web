import styled from 'styled-components';

const FakeNav = styled.div`
    width: 12.5%;
`

const NavShadow = styled.div.attrs(({scrollPosition}) => ({style: {transform: `translateX(-${(Number(scrollPosition) * 1.5 / 1080 * 100)}%`}}))`
    background-color: black;
    position: absolute;
    top: 0;
    left: 12.5%;
    height: 100vh;
    width: 17.3%;
`

const SubNavSection = ({scrollPosition}) => (
    <>
        <NavShadow scrollPosition={scrollPosition}/>
        <FakeNav />
    </>
)

export default SubNavSection