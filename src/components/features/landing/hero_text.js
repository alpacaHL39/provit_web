import styled, {css} from 'styled-components';

const HeroText = styled.div`
	position: absolute;
	top: 34%;
	left: 8.57%;
	height: 31%;
`

const HeroTextNormalIn = styled.div`
	position: absolute;
	top: 34%;
	left: 8.57%;
	height: 31%;
	opacity:0;
	transform: translateX(40vw);

	${({ shouldTrigger }) => shouldTrigger && css`transform: translateX(0); opacity: 1;` }
	transition: 1s;
`
const HeroTextNormalOut = styled.div`
	position: absolute;
	top: 34%;
	left: 8.57%;
	height: 31%;
	opacity:1;
	transform: translateY(0);

	${({ shouldTrigger }) => shouldTrigger && css`transform: translateY(-10vw); opacity: 0;` }
	transition: 1s;
`
const HeroTextReverseIn = styled.div`
	position: absolute;
	top: 34%;
	left: 8.57%;
	height: 31%;
	opacity:0;
	transform: translateY(-10vw);

	${({ shouldTrigger }) => shouldTrigger && css`transform: translateY(0); opacity: 1;` }
	transition: 1s;
`
const HeroTextReverseOut = styled.div`
	position: absolute;
	top: 34%;
	left: 8.57%;
	height: 31%;
	opacity:1;
	transform: translateX(0vw);

	${({ shouldTrigger }) => shouldTrigger && css`transform: translateX(40vw); opacity: 0;` }
	transition: 1s;
`

const HeroTextSection = ({shouldTrigger, shouldReverse, hideNormal, hideReverse, page, setHideNormal, setHideReverse, MAX_PAGE}) => {
    if(!hideNormal) return (
        <>
            {page === 1 ? null : (
                <HeroTextNormalOut shouldTrigger={shouldTrigger} ><img src={`/assets/hero_text/page_${page-1}.png`} style={{height: '100%'}} /></HeroTextNormalOut>
            )}
			<HeroTextNormalIn shouldTrigger={shouldTrigger} onTransitionEnd={() => setHideNormal(true)}><img src={`/assets/hero_text/page_${page}.png`} style={{height: '100%'}} /></HeroTextNormalIn>
        </>
    )
    if(!hideReverse) return (
        <>
			<HeroTextReverseIn shouldTrigger={shouldReverse} onTransitionEnd={() => setHideReverse(true)}><img src={`/assets/hero_text/page_${page}.png`} style={{height: '100%'}}/></HeroTextReverseIn>
			{
				page === MAX_PAGE ? null : (
					<HeroTextReverseOut shouldTrigger={shouldReverse}><img src={`/assets/hero_text/page_${page+1}.png`} style={{height: '100%'}}/></HeroTextReverseOut>
				)
			}
        </>
    )
    if(hideNormal && hideReverse) return (<HeroText><img src={`/assets/hero_text/page_${page}.png`} style={{height: '100%'}}/></HeroText>)
}

export default HeroTextSection