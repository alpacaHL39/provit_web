import styled, {css} from 'styled-components';

// const pageColor = ['Aquamarine',  'thistle', 'gold']
const pageColor = ['#3CDCB5', '#FF8AE1', '#FFD764', '#B296CC','#006584']

const PageNumber = styled.div`
	position: absolute;
	top: 6.4vw;
	left: 51.5vw;
	height: 1.5vw;
	width: 23.5vw;
	display:flex;
	overflow: hidden;
`

const PageNumberFirstBatch = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${({isReverted}) => isReverted ? 'translateX(-40%)' : 'translate(0)'};

	${({shouldTrigger, shouldReverse}) => shouldTrigger && css`transform: translateX(-41.5%);` || shouldReverse && css`transform: translateX(0);`}

	// ${({page}) =>  css`transform: translateX(-${(page - 1) * 23}%);`};
	transition:0.7s 0.3s;
`

const PageNumberItem = styled.div`
	font-family: 'Montserrat';
	${({page, currentPage}) => 
		page === currentPage
			? css`
				// width: 37px;
				color: ${pageColor[currentPage -1]};
				font-size: 1.8vw;
				font-weight: 700;
				// letter-spacing: 3px;
				`
			: css`
				// width: 31px;
				color: white;
				font-size: 1.3vw;
				font-weight: 400;`
	}
	transition: 0.7s;
`

const PageNumberPrev = styled.div`
	font-family: 'Montserrat';
	${({isReverted}) => isReverted && css`color: white; font-size: 1.3vw; font-weight: 400;`}
	${({shouldTrigger, currentPage, shouldReverse}) => {
		if(shouldTrigger !== undefined){
			return !shouldTrigger
				? css`
					color: ${pageColor[currentPage -1]};
					font-size: 1.8vw;
					font-weight: 700;
					`
				: css`
					color: white;
					font-size: 1.3vw;
					font-weight: 400;`
		}

		if(shouldReverse !== undefined){
			return shouldReverse 
				? css`
					color: ${pageColor[currentPage -1]};
					font-size: 1.8vw;
					font-weight: 700;
					`
				: css`
					color: white;
					font-size: 1.3vw;
					font-weight: 400;`
		}
	}
	}
	opacity: ${({hideThisItem}) => hideThisItem ? 0 : 1};
	transition: 0.7s;
`

const PageNumberCurr = styled.div`
	font-family: 'Montserrat';
	${({isReverted, currentPage}) => isReverted && css`color: ${pageColor[currentPage -1]}; font-size: 1.8vw; font-weight: 700;`}

	${({shouldTrigger, currentPage, shouldReverse}) => {
		if(shouldTrigger !== undefined){
			return shouldTrigger
				? css`
					color: ${pageColor[currentPage -1]};
					font-size: 1.8vw;
					font-weight: 700;
					`
				: css`
					color: white;
					font-size: 1.3vw;
					font-weight: 400;`
		}

		if(shouldReverse !== undefined){
			return !shouldReverse 
				? css`
					color: ${pageColor[currentPage -1]};
					font-size: 1.8vw;
					font-weight: 700;
					`
				: css`
					color: white;
					font-size: 1.3vw;
					font-weight: 400;`
		}
	}
	}
	transition: 0.7s;
`

const PageNumberConn = styled.div`
	width: ${({shouldExtend}) => shouldExtend ? '6.5vw' : '3.4vw'};
	// width: ${({shouldExtend}) => shouldExtend ? '5.8vw' : '3.4vw'};
	// width: ${({shouldTrigger, shouldReverse}) => shouldReverse || shouldTrigger ? '5vw;': '3.4vw;'}
	height: 5%;
	// margin: 0 0.5vw;
	margin-left: 0.8vw;
	margin-right: ${({shouldExtend}) => shouldExtend ? 0 : '0.5vw'};
	background-color: white;
	opacity: ${({hideThisItem}) => hideThisItem ? 0 : 1};
`

const PageNumberBridge = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	${({IS_DEV}) => IS_DEV && css`border: yellow 1px solid;`}
`

const PageNumberLastBatch = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	${({IS_DEV}) => IS_DEV && css`border: red 1px solid;`}
`

const PageNumberBridgeItem = styled.div`
	height: 5%;
	background-color: white;
	width: 100%; 
	margin: ${({shouldExtend, shouldTrigger}) => shouldExtend && shouldTrigger === undefined ? '0 1vw 0 0' : '0 1vw'};
	${({shouldExtend, shouldTrigger}) => shouldExtend && shouldTrigger && css`margin: 0 1vw 0 0;` }
	transition: 0.7s;
`

const pageNumberHelper = (pageNumber) => pageNumber < 10 ? `0${pageNumber}` : pageNumber

const PageNumberSection = ({hideNormal, hideReverse, page, shouldReverse, shouldTrigger, IS_DEV, MAX_PAGE}) => (
    <PageNumber>
        <div style={{width: '38%', overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
            {
                !hideNormal && (
                    <PageNumberFirstBatch IS_DEV={IS_DEV} shouldTrigger={shouldTrigger && page !== MAX_PAGE}>
						{page === MAX_PAGE ? (
							<>
								<PageNumberItem page={page} currentPage={page - 1}>{pageNumberHelper(page - 1)}</PageNumberItem>
								<PageNumberConn shouldExtend={true}/>
							</>
						) : (
							<>
								<PageNumberPrev shouldTrigger={shouldTrigger} currentPage={page - 1} hideThisItem={page - 1 < 1 }>{pageNumberHelper(page -1)}</PageNumberPrev>
								<PageNumberConn hideThisItem={page - 1 < 1}/>
								<PageNumberCurr shouldTrigger={shouldTrigger} currentPage={page}>{pageNumberHelper(page)}</PageNumberCurr>
								<PageNumberConn shouldExtend={page >= MAX_PAGE-1}/>
								{!(page >= MAX_PAGE-1) ? (<PageNumberItem page={page} currentPage={page + 1}>{pageNumberHelper(page + 1)}</PageNumberItem>) : null}
							</>
						)}
                    </PageNumberFirstBatch>
                )
            }
            {
                hideNormal && hideReverse && (
                    <PageNumberFirstBatch IS_DEV={IS_DEV} page={page}>
						{page === MAX_PAGE ? (
							<>
								<PageNumberItem page={page} currentPage={page - 1}>{pageNumberHelper(page - 1)}</PageNumberItem>
								<PageNumberConn shouldExtend={true}/>
							</>
						) : (
							<>
								<PageNumberItem page={page} currentPage={page}>{pageNumberHelper(page)}</PageNumberItem>
								<PageNumberConn shouldExtend={page === MAX_PAGE - 1}/>
								{!(page >= MAX_PAGE -1) && (<PageNumberItem page={page} currentPage={page + 1}>{pageNumberHelper(page + 1)}</PageNumberItem>)}
							</>
						)}
                    </PageNumberFirstBatch>
                )
            }
            {
                !hideReverse && (
					<PageNumberFirstBatch IS_DEV={IS_DEV} shouldReverse={shouldReverse && page < MAX_PAGE - 1} isReverted={true && page < MAX_PAGE - 1}>
						{page >= MAX_PAGE - 1 ? (
							<>
								{page === MAX_PAGE ? (
								<>
									<PageNumberItem page={page} currentPage={page - 1}>{pageNumberHelper(page - 1)}</PageNumberItem>
									<PageNumberConn shouldExtend={true}/>
								</>) : (
								<>
									<PageNumberItem page={page} currentPage={page}>{pageNumberHelper(page)}</PageNumberItem>
									<PageNumberConn shouldExtend={true}/>
								</>)}
							</>
						) : (
							<>
								<PageNumberPrev shouldReverse={shouldReverse} currentPage={page} isReverted={true}>{pageNumberHelper(page)}</PageNumberPrev>
								<PageNumberConn  shouldReverse={shouldReverse} />
								<PageNumberCurr shouldReverse={shouldReverse} currentPage={page + 1} isReverted={true}>{pageNumberHelper(page + 1)}</PageNumberCurr>
								<PageNumberConn shouldExtend={page >= MAX_PAGE -2}/>
								{!(page >= MAX_PAGE-2) ? (<PageNumberItem page={page} currentPage={page + 2}>{pageNumberHelper(page + 2)}</PageNumberItem>) : null}
							</>
						)}
                    </PageNumberFirstBatch>
                )
            }
        </div>
        <PageNumberBridge IS_DEV={IS_DEV}>
			{
				!hideNormal && (
					<PageNumberBridgeItem shouldExtend={page >= MAX_PAGE - 2} shouldTrigger={shouldTrigger}/>
				)
				}
			{
				hideNormal && hideReverse && (
					<PageNumberBridgeItem shouldExtend={page >= MAX_PAGE - 2}/>
				)
			}
			{
				!hideReverse && (
					<PageNumberBridgeItem shouldExtend={page >= MAX_PAGE - 2} shouldTrigger={shouldReverse}/>
				)
			}
        </PageNumberBridge>
        <PageNumberLastBatch IS_DEV={IS_DEV}>
			<PageNumberItem page={page} currentPage={MAX_PAGE} shouldTrigger={shouldTrigger}>{pageNumberHelper(MAX_PAGE)}</PageNumberItem>
        </PageNumberLastBatch>
    </PageNumber>
)

export default PageNumberSection