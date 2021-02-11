import React, { Component } from 'react'
import styled from 'styled-components'
import {store, toggleDirectoryMenu, switchView} from '../redux_guts/redux'
import {QuestionMark} from '../building_components/library_parts/libraryparts'
import Tooltip from '@material-ui/core/Tooltip';

function changeURL(url, title) {
    var new_url = '/' + url;
    window.history.pushState('data', title, new_url); 
}

export default class Directory extends Component {
    constructor(props) {
        super(props)
        this.unsubscribe = undefined;
        this.state = {
            open: false,
            currentView: "Main App"
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.onStoreChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    onStoreChange = () => {
        this.setState({open: store.getState().directoryMenu, currentView: store.getState().currentView})
    }
    
    handleButtonClose = () => {
        store.dispatch(toggleDirectoryMenu());
    }

    handleLinkClick = (type) => {
        switch (type) {
            case 0:
                store.dispatch(switchView("Main App"))
                break;
            case 1:
                store.dispatch(switchView("About"))
                break;
            case 2:
                store.dispatch(switchView("Contact"))
                break;
            case 3:
                store.dispatch(switchView("Resources"))
                break;
            default: 
                return;
        }
        store.dispatch(toggleDirectoryMenu());
    }

    render() {
        return (
            <DirectoryBody collapsed={!this.state.open}>
                <Tooltip placement="left" title="Click to close directory">
                    <CloseButton onClick={this.handleButtonClose}><QuestionMark className="material-icons">close</QuestionMark></CloseButton>
                </Tooltip>
                <InfoSection>
                    <InfoTitle>The Directory</InfoTitle>
                    <InfoDescription>Welcome to the BPA NLC planner! You are currently viewing the {this.state.currentView} page. If you need help, use the Contact button.</InfoDescription>
                </InfoSection>
                <Divider />
                <LinkSection>
                    <LinkItem onClick={() => this.handleLinkClick(0)}><LinkInner selected={this.state.currentView === "Main App"}>Main App</LinkInner></LinkItem>
                    <LinkItem onClick={() => this.handleLinkClick(1)}><LinkInner selected={this.state.currentView === "About"}>About</LinkInner></LinkItem>
                    <LinkItem onClick={() => this.handleLinkClick(2)}><LinkInner selected={this.state.currentView === "Contact"}>Contact</LinkInner></LinkItem>
                    <LinkItem onClick={() => this.handleLinkClick(3)}><LinkInner selected={this.state.currentView === "Resources"}>Resources</LinkInner></LinkItem>
                </LinkSection>
            </DirectoryBody>
        )
    }
}

const LinkSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 70%;

    
    @media screen and (max-width: 600px) {
        flex-direction: column;
        height: auto;
    }
`

const LinkItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    transition: background-color 0.2s;
    cursor: pointer;
    padding: 10px;
    box-sizing: border-box;
    margin-right: 10px;
    margin-left: 10px; 
    border-radius: 5px;

    @media screen and (max-width: 600px) {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const LinkInner = styled.a`
    margin: 0;
    font-size: 14px;
    color: black;
    text-decoration: none;

    @media screen and (max-width: 600px) {
        font-size: 20px;;
    }

    ${({ selected }) => selected && `
        font-weight: 600;
    `}
`

const DirectoryBody = styled.div`
    height: 200px;
    width: 100vw;
    background-color: #aee6e6;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center; 
    transition: opacity 0.2s, height 0.2s;

    @media screen and (max-width: 600px) {
        height: 100vh;
        flex-direction: column;
    }

    ${({ collapsed }) => collapsed && `
        opacity: 0;
        height: 0px;
        pointer-events: none;
    `}
`

export const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50px;
    min-width: 50px;
    cursor: pointer;
    user-select: none;
    color: black;
    transition: background-color 0.2s;
    border-radius: 5px;
    font-size: 24px !important;

    :hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-contenter: center;
    align-items: center;
    max-width: 300px;
    text-align: left;

    @media screen and (max-width: 600px) {
        text-align: center;
    }
`

const InfoTitle = styled.h2`
    margin: 0;
    text-align: left;
    width: 100%;
    font-family: 'Lato', sans-serif;

    @media screen and (max-width: 600px) {
        text-align: center;
    }
`

const InfoDescription = styled.p`
    margin: 0;
    font=size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 5px;
`
const Divider = styled.div`
    height: 70%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    margin-left: 15px;
    margin-right: 15px;
    @media screen and (max-width: 600px) {
        width: 60%;
        height: 1px;
        margin: 0px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`
