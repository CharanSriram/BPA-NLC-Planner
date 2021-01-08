import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip'
import Card from '../building_components/Card'
import { store, deselectCard, toggleMenu } from '../redux_guts/redux' 
import { CollapseMenuButton, LibraryBody, SearchBarContainer, SearchBar, ChipContainer, ResultsQuery, ResultsContainer } from '../building_components/library_parts/libraryparts'
import DirectionsBlock from '../building_components/library_parts/DirectionsBlock'
import RatingsBlock from '../building_components/library_parts/RatingsBlock'
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components'
import Placeholder from './library_parts/Placeholder'

function newLineText(props) {
    const text = props + ""
    console.log(text.split('+n'))
    const newText = text.split('+n').map(str => <ItemDescription>{str}</ItemDescription>)

    return newText;
}

export default class Library extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchItemSelected: false,
            searchBarQuery : "",
            chipsAvailable : ["Disney World", "Universal Studios", "SeaWorld", "Harry P Leu Gardens"],
            chipsSelected: [],
            results: [],
            collapseMenu: false
        }
        this.unsub = undefined
    }

    componentDidMount() {
        this.unsub = store.subscribe(this.handleReduxChange)
    }

    handleReduxChange = () => {
        this.setState({searchItemSelected: store.getState().cardSelectedID !== "", collapseMenu: store.getState().collapsedMenu}) 
    }

    searchBarOnChange = (e) => {
        this.setState({searchBarQuery: e.target.value}, () => {
        let temp = []
        if (this.state.chipsSelected.length === 0) {
            store.getState().infoList.allIDs.forEach(id => {
                if ((store.getState().infoList.allCards[id].description.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].description.toLowerCase().includes(this.state.searchBarQuery)) || (store.getState().infoList.allCards[id].title.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].title.toLowerCase().includes(this.state.searchBarQuery))) {
                    temp.push(id);
                }
            })
            if (e.target.value === "") {temp=[]}
        } else {
            this.state.chipsSelected.forEach(category => {
                let properName = ""
                switch (category) {
                    case "Disney World":
                        properName = "disneyWorldList"
                        break;
                    case "Universal Studios":
                        properName = "universalStudioList"
                        break;
                    case "SeaWorld":
                        properName = "seaworldList"
                        break;
                    case "Harry P Leu Gardens":
                        properName = "gardensList"
                        break;
                    default: 
                        break;
                }
                
                store.getState().infoList[properName].forEach(id => {
                    if ((store.getState().infoList.allCards[id].description.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].description.toLowerCase().includes(this.state.searchBarQuery)) || (store.getState().infoList.allCards[id].title.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].title.toLowerCase().includes(this.state.searchBarQuery))) {
                        temp.push(id)
                    }
                })
            })
        }
        this.setState({results: temp}, () => {})
        })
    }

    chipOnClick = (num) => {
        let temp = [...this.state.chipsSelected]
        if (this.state.chipsSelected.includes(this.state.chipsAvailable[num])) {
            temp = temp.filter(chip => chip !== this.state.chipsAvailable[num])
            this.setState({
                chipsSelected: temp
            }, () => {
                if (this.state.searchBarQuery !== "") {
                    let newTemp = []
                    if (this.state.chipsSelected.length === 0) {
                        store.getState().infoList.allIDs.forEach(id => {
                            if ((store.getState().infoList.allCards[id].description.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].description.toLowerCase().includes(this.state.searchBarQuery)) || (store.getState().infoList.allCards[id].title.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].title.toLowerCase().includes(this.state.searchBarQuery))) {
                                newTemp.push(id);
                            }
                        })
                    } else {
                        this.state.chipsSelected.forEach(category => {
                            let properName = ""
                            switch (category) {
                                case "Disney World":
                                    properName = "disneyWorldList"
                                    break;
                                case "Universal Studios":
                                    properName = "universalStudioList"
                                    break;
                                case "SeaWorld":
                                    properName = "seaworldList"
                                    break;
                                case "Harry P Leu Gardens":
                                    properName = "gardensList"
                                    break;
                                default: 
                                    break;
                            }
                            
                            store.getState().infoList[properName].forEach(id => {
                                if ((store.getState().infoList.allCards[id].description.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].description.toLowerCase().includes(this.state.searchBarQuery)) || (store.getState().infoList.allCards[id].title.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].title.toLowerCase().includes(this.state.searchBarQuery))) {
                                    newTemp.push(id)
                                }
                            })
                        })
                    }
                    this.setState({results: newTemp}, () => {})
                } else {
                    if (this.state.chipsSelected.length > 0) {
                        let newNewTemp = []
                        this.state.chipsSelected.forEach(category => {
                            let properName = ""
                            switch (category) {
                                case "Disney World":
                                    properName = "disneyWorldList"
                                    break;
                                case "Universal Studios":
                                    properName = "universalStudioList"
                                    break;
                                case "SeaWorld":
                                    properName = "seaworldList"
                                    break;
                                case "Harry P Leu Gardens":
                                    properName = "gardensList"
                                    break;
                                default: 
                                    break;
                            }
                            
                            store.getState().infoList[properName].forEach(id => {
                                newNewTemp.push(id)
                            })
                        })
                        this.setState({results: newNewTemp})
                    } else {
                        this.setState({results: []})
                    }
                }
            })
        } else {
            temp.push(this.state.chipsAvailable[num])
            this.setState({chipsSelected: temp}, () => {
                if (this.state.searchBarQuery !== "") {
                    let tempArr = []
                    this.state.chipsSelected.forEach(category => {
                        let properName = ""
                        switch (category) {
                            case "Disney World":
                                properName = "disneyWorldList"
                                break;
                            case "Universal Studios":
                                properName = "universalStudioList"
                                break;
                            case "SeaWorld":
                                properName = "seaworldList"
                                break;
                            case "Harry P Leu Gardens":
                                properName = "gardensList"
                                break;
                            default: 
                                break;
                        }
                        store.getState().infoList[properName].forEach(id => {
                            if ((store.getState().infoList.allCards[id].description.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].description.toLowerCase().includes(this.state.searchBarQuery)) || (store.getState().infoList.allCards[id].title.includes(this.state.searchBarQuery) || store.getState().infoList.allCards[id].title.toLowerCase().includes(this.state.searchBarQuery))) {
                                tempArr.push(id)
                            }
                        })
                    })
                    this.setState({results: tempArr})
                } else {
                    let tempArr = []
                    this.state.chipsSelected.forEach(category => {
                        let properName = ""
                        switch (category) {
                            case "Disney World":
                                properName = "disneyWorldList"
                                break;
                            case "Universal Studios":
                                properName = "universalStudioList"
                                break;
                            case "SeaWorld":
                                properName = "seaworldList"
                                break;
                            case "Harry P Leu Gardens":
                                properName = "gardensList"
                                break;
                            default: 
                                break;
                        }

                        store.getState().infoList[properName].forEach(id => {
                            tempArr.push(id)
                        })
                    })
                    this.setState({results: tempArr})
                }
            })
        }
    }

    returnButtonOnClick = () => {
        store.dispatch(deselectCard())
        console.log(store.getState())
    }

    menuToggleOnClick = () => {
        store.dispatch(toggleMenu())
    }

    toggleDescription = () => {
        this.setState({showDescription: !this.state.showDescription})
    }

    render() {
        if (!this.state.searchItemSelected) {
            // Keys used for items will come from AUTO gen keys in Firebase
            return (
                <LibraryBody collapsed={this.state.collapseMenu}>
                    <SearchBarContainer>
                        <i style={{color: "rgba(0, 0, 0, 0.3)", userSelect:"none"}} className="material-icons">search</i>
                        <SearchBar onChange={this.searchBarOnChange} value={this.state.searchBarQuery} placeholder="Search for an amenity..."></SearchBar>
                    </SearchBarContainer>
                    <ChipContainer>
                    {
                        this.state.chipsAvailable.map(chip => {
                            return <Chip variant = {this.state.chipsSelected.includes(chip) ? "outlined" : "default"} onClick={() => this.chipOnClick(this.state.chipsAvailable.indexOf(chip))} clickable={true} key={this.state.chipsAvailable.indexOf(chip)} label={chip}/>
                        })
                    }
                    </ChipContainer>
                    <ResultsQuery collapsed={this.state.collapseMenu}>{this.state.results.length} Results</ResultsQuery>
                    <ResultsContainer>
                        {
                            this.state.results.length === 0 ? <Placeholder></Placeholder>: undefined
                        }
                        {
                            this.state.results.map(result => {
                                return <Card key={result} keyProp={result} id={result}/>
                            })
                        }
                    </ResultsContainer>
                    <Tooltip placement="right" title="Click to toggle menu">
                        <CollapseMenuButton onClick={this.menuToggleOnClick}><QuestionMark style={{fontSize: "18px"}} className="material-icons">{this.state.collapseMenu ? "keyboard_arrow_down" : "keyboard_arrow_up"}</QuestionMark></CollapseMenuButton>
                    </Tooltip>
                </LibraryBody>
            ) 
        }

        let selectedInfo = store.getState().infoList.allCards[store.getState().cardSelectedID]
        let selectedType = ""
        switch(selectedInfo.type) {
            case 0:
                selectedType = "Disney World";
                break;
            case 1:
                selectedType = "Universal Studios";
                break;
            case 2:
                selectedType = "SeaWorld";
                break;
            case 3:
                selectedType = "Harry P Leu Gardens";
                break;
            default: 
                selectedType = "NONE"
        }
        return (
            <LibraryBody collapsed2={this.state.collapseMenu}>
                <Tooltip placement="right" title="Click to return">
                    <ReturnButton className="material-icons" onClick={this.returnButtonOnClick}>keyboard_arrow_left</ReturnButton>
                </Tooltip>
                <Tooltip placement="right" title="Click to toggle menu">
                    <CollapseMenuButton onClick={this.menuToggleOnClick}><QuestionMark style={{fontSize: "18px"}} className="material-icons">{this.state.collapseMenu ? "keyboard_arrow_down" : "keyboard_arrow_up"}</QuestionMark></CollapseMenuButton>
                </Tooltip>
                {this.state.collapseMenu ? <ItemTitle>{selectedInfo.title.length >= 24 ? selectedInfo.title.substring(0, 24) + "..." : selectedInfo.title}</ItemTitle> : <ItemTitle>{selectedInfo.title}</ItemTitle>}
                <CollapsableArea>
                    <ContainsArea>
                        {selectedType !== "NONE" ? <Chip style={{minHeight: "32px"}} variant="outlined" label={selectedType} /> : undefined}
                        <ImageContainer>
                            <Tooltip placement="bottom" title="Sourced from Google Images">
                                <InfoTag><QuestionMark>?</QuestionMark></InfoTag>
                            </Tooltip>
                            <ItemImage src={selectedInfo.imageURL}></ItemImage>
                        </ImageContainer>
                        
                        {/* Description */}
                        <ItemHeader>Description</ItemHeader>
                        {newLineText(selectedInfo.description)}
                        
                        {/* Ratings */}
                        {selectedInfo.ratings != undefined ? <ItemHeader>Analysis</ItemHeader> : undefined}
                        {selectedInfo.ratings != undefined ? <RatingsBlock costScore={selectedInfo.ratings.expenseLevel} starScore={selectedInfo.ratings.score} ></RatingsBlock> : undefined}

                        {/* Location */}
                        {selectedInfo.address != undefined ? <ItemHeader>Directions</ItemHeader> : undefined}
                        {selectedInfo.address != undefined ? <DirectionsBlock address={selectedInfo.address}></DirectionsBlock> : undefined}
                    </ContainsArea>
                </CollapsableArea>

                {/*selectedInfo.picture !== undefined ? */}
                    
            </LibraryBody>
        )

    }
}



const ContainsArea = styled.div`
    height: 100%;
    width: calc(100% - 25px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
`

const CollapsableArea = styled.div`
    height: 100%;
    width: calc(100% + 50px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    position: relative;
    right: 25px;
    padding-left: 25px;

    ::-webkit-scrollbar {
        width: 4px;
        position: relative;
        left: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        position: relative;
        left: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
        transition: background-color 0.2s;
        position: relative;
        left: 5px;

    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
        position: relative;
        left: 5px;

    }
`

const ReturnButton = styled.button`
    min-height: 50px;
    width: 50px;
    background-color: rgba(174, 230, 230, 0.5);
    outline: none;
    border: none;
    text-align: center;
    transition: background-color 0.2s;
    color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;

    :hover {
        background-color: rgba(174, 230, 230, 0.6);
    }
`

const ItemTitle = styled.h1`
    font-family: 'Lato', sans-serif;
    margin: 0;
    margin-top: 20px;
    margin-bottom: 15px;
`

const ImageContainer = styled.div`
    width: 100%;
    min-height: 150px;
    max-height: 250px;
    padding: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-top: 20px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
`

const ItemImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
`

const ItemHeader = styled.h3`
    font-family: 'Lato', sans-serif;
    color: rgba(0, 0, 0, 0.75);
    margin: 0;
    margin-top: 25px;
`

const ItemDescription = styled.p`
    margin: 0;
    font-family: Roboto, sans-serif;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    margin-top: 7px;
    text-align: left;
    font-style: italic;
`

const InfoTag = styled.div`
    height: 35px;
    width: 35px;
    border-radius: 17.5px;
    background-color: #FFDA77;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const QuestionMark = styled.p`
    margin: 0;
    font-size: 14px;
`

