import {useState, useEffect, useRef} from 'preact/hooks'
import styled, {css} from 'styled-components';

const Player = styled.div`
	display: flex;
	gap: 2.291vw;
	height: 100%;
	transform: translateX(${({isNormal}) => isNormal ? 0 : '-25.884vw'});
	${({shouldTrigger, shouldReverse}) => {
		if(shouldTrigger) return css`transform: translateX(-25.5vw);`
		if(shouldReverse) return css`transform: translateX(0);`
	}}
	// tranform: translateX(${({shouldTrigger, shouldReverse}) => (shouldTrigger || shouldReverse ) && 0}px);
	transition: 1s;
`

const PlayerWrapper = styled.div`
	position: absolute;
	top: 68.7%;
	left: 60%;
	overflow: hidden;
	width: 100%;
	height: 24%;
`

const PlayerItem = styled.div`
	width: 31.6%; 
	height: 100%;
	border-radius: 24px;
	overflow: hidden;
	position: relative;
	opacity: ${({isReverse}) => isReverse ? 0 : 1};
	${({shouldTrigger}) => shouldTrigger && css`opacity: 0;`}
	
	&:hover{
		cursor: pointer;
		img {
			opacity : 1;
		}
	}
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 1s ease-in-out;
`

const PlayerFadeInItem = styled.div`
	top: 68.7%;
	left: 60%;
	position: absolute;
	width: 31.6%; 
	height: 24%;
	border-radius: 24px;
	// width: 23.593vw; 
	// height: 13.333vw;
	// border-radius: 1.25vw;
	
	transform: translateX(-25.884vw);
	opacity: 0;
	overflow: hidden;
	${({shouldReverse}) => shouldReverse && css`opacity:1; transform: translateX(0);` }
	transition: 1s;
	display: flex;
	align-items: center;
	justify-content: center;
`
	
const PlayerFadeOutItem = styled.div`
	top: 68.7%;
	left: 60%;
	position: absolute;
	width: 31.6%; 
	height: 24%;
	border-radius: 24px;
	// width: 23.593vw; 
	// height: 13.333vw;
	// border-radius: 1.25vw;
	overflow: hidden;

	transform: translateX(0);
	opacity: 1;
	${({shouldTrigger}) => shouldTrigger && css`opacity:0; transform: translateX(-25.884vw);` }
	transition: 1s;
	display: flex;
	align-items: center;
	justify-content: center;
`

const PlayButton = styled.img.attrs(() => ({src: '/assets/icons/playbotton.svg'}))`
	opacity: 0.25;
	z-index: 1;
`

const PlayVideo = styled.video.attrs(() => ({autoPlay: false, loop: true, muted: true}))`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left:0;
	object-fit: cover;

	${({isActivePlayer}) => isActivePlayer && css`
		&:hover{
			opacity : 0;
		}
		transition: 1s
	`}
`

const PlayItemBackground = styled.img.attrs(({page}) => ({src: `/assets/gifs/page_${page}.jpg`}))`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left:0;
	opacity: 0;

	${({isActivePlayer}) => isActivePlayer && css`
		&:hover{
			opacity : 1;
		}
		transition: 1s
	`}
`

const PlayerContent = ({page, isReverse, shouldTrigger}) => (
<PlayerItem page={page} currentPage={page+1} isReverse={isReverse} shouldTrigger={shouldTrigger}>
	<PlayVideo page={page}>
		<source src={`/assets/gifs/page_${page}.mp4`} type="video/mp4" />
	</PlayVideo>
	<PlayButton />
</PlayerItem>)

const PlayerSection = ({hideNormal, hideReverse, page, shouldReverse, shouldTrigger, MAX_PAGE}) => {
	const mp4Player = useRef(null)

	useEffect(()=>{
		let timer;
		if(hideNormal && hideReverse) {
			timer = setTimeout(() => {
				mp4Player.current.play()
			}, 800);
		}
		return () => clearTimeout(timer)
	}, [hideNormal, hideReverse])

	const handlePause = () => {
		mp4Player.current.style.opacity = 0
		mp4Player.current.pause()
	}
	const handlePlay = () => {
		mp4Player.current.style.opacity = 1
		mp4Player.current.play()
	}
	
	return(
    <>
        <PlayerWrapper>
            {
                !hideNormal && (
                    <Player shouldTrigger={shouldTrigger} isNormal={true}>
						<PlayerContent isReverse={true} />
						{/* {page === 1 ? (<PlayerContent isReverse={true}/>) : (<PlayerContent page={page - 1} shouldTrigger={shouldTrigger} />)} */}
                        <PlayerContent page={page} />
						{page === MAX_PAGE ? null : (
							<PlayerContent page={page + 1}/>
						)}
                    </Player>
                )
            }
            {
                hideNormal && hideReverse && (
                    <Player isNormal={true}>
                        <PlayerItem page={page} currentPage={page} onMouseOver={handlePause} onMouseLeave={handlePlay}>
							<PlayVideo isActivePlayer={true} page={page} ref={mp4Player}>
								<source src={`/assets/gifs/page_${page}.mp4`} type="video/mp4" />
							</PlayVideo>
							<PlayItemBackground page={page} isActivePlayer={true}/>
							<PlayButton />
						</PlayerItem>
						{page === MAX_PAGE ? null : (
							<PlayerContent page={page + 1}/>
						)}
                    </Player>
                )
            }
            {
                !hideReverse && (
                    <Player shouldReverse={shouldReverse}>
						<PlayerContent page={page} isReverse={true}/>
						{page === MAX_PAGE ? null : (
							<PlayerContent page={page + 1}/>
						)}
                    </Player>
                )
            }
        </PlayerWrapper>
        {
            !hideNormal && page !== 1 && (
			<PlayerFadeOutItem page={page} shouldTrigger={shouldTrigger}>
				<PlayVideo page={page - 1}>
					<source src={`/assets/gifs/page_${page - 1}.mp4`} type="video/mp4" />
				</PlayVideo>
				<PlayButton />
			</PlayerFadeOutItem>)
        }
        {
            !hideReverse && (
			<PlayerFadeInItem page={page} shouldReverse={shouldReverse}>
				<PlayVideo page={page}>
					<source src={`/assets/gifs/page_${page}.mp4`} type="video/mp4" />
				</PlayVideo>
				<PlayButton />
			</PlayerFadeInItem>)
        }
    </>
)}

export default PlayerSection