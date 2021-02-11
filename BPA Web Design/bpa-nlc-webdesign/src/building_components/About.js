import React, { Component } from 'react'
import styled from 'styled-components'
import {QuestionMark} from './library_parts/libraryparts'
import { store, switchView } from '../redux_guts/redux' 


export default class About extends Component {
    constructor(props) {
        super(props)
    
        this.unsubscribe = undefined
        this.state = {
            open: false,
            menuOpen: false
        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.storeDidChange);
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                if (this.state.menuOpen) this.setState({menuOpen: false})
            }
        });
    }

    storeDidChange = () => {
        this.setState({open: store.getState().currentView === "About"})
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
    }

    toggleHamBurger = () => {
        this.setState({menuOpen: !this.state.menuOpen})
    }

    handleCloseHam =() => {
        if (this.state.menuOpen)
            this.setState({menuOpen: !this.state.menuOpen})
    }

    render() {
        return (
            <AboutBody onClick={this.handleCloseHam} open={this.state.open}>
                <AboutDirectory ham={this.state.menuOpen}>
                    <LinkItem ham={this.state.menuOpen} onClick={() => this.handleLinkClick(0)}><LinkInner ham={this.state.menuOpen}>Main App</LinkInner></LinkItem>
                    <LinkItem ham={this.state.menuOpen} onClick={() => this.handleLinkClick(1)}><LinkInner ham={this.state.menuOpen} selected={true}>About</LinkInner></LinkItem>
                    <LinkItem ham={this.state.menuOpen} onClick={() => this.handleLinkClick(2)}><LinkInner ham={this.state.menuOpen}>Contact</LinkInner></LinkItem>
                </AboutDirectory>
                <CloseButton onClick={this.toggleHamBurger}><QuestionMark className="material-icons">menu</QuestionMark></CloseButton>
                <AboutPageImage src="https://gifted-mclean-c050f4.netlify.app/images/undraw_about_me_wa29.svg" loading="lazy"></AboutPageImage>
                <AboutSection>
                    <AboutHeader>General</AboutHeader>
                    <AboutP>NLC Hub is a web application created using React that makes planning your trip to DC productive, interactive, and fun.</AboutP>
                    <AboutP>The map you see on the Main App page is completely interactive! Enter keywords like "hotel" or "restaurant" to get a list of attractions and their corresponding details.</AboutP>
                    <AboutP>Once you select an attraction, the map will reposition itself at the location. From there, you can get your current address and get directions directly to the attraction via Google Maps.</AboutP>
                    <AboutP>If you have a mobile device with the Google Maps app, try visiting the website from there; our site will switch to the app on your phone with the directions prefilled.</AboutP>
                    <AboutHeader>Behind the Scenes</AboutHeader>
                    <AboutA href="https://github.com/CharanSriram/BPA-NLC-Planner">Visit the Github</AboutA>
                </AboutSection>
            </AboutBody>
        )
    }
}

const AboutPageImage = styled.img`
    max-width: 500px;
    margin-bottom: 20px;

    @media screen and (max-width: 600px) {
        max-width: calc(100% - 30px);
    }
`

const AboutSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
    max-width: 500px;
`

const AboutHeader = styled.h3`
    margin: 0;
    color: black;
    width: 100%;
    text-align: left;
    font-family: 'Lato';
    margin-bottom: 10px;
    margin-top: 5px;
`

const AboutP = styled.p`
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.75);
    text-align: left;
    margin-bottom: 15px;
`

const AboutA = styled.a`
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.75);
    text-align: left;
    margin-bottom: 15px;
    width: 100%;
    text-align: left;
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
    display: none;
    background-color: #029696;
    color: black;
    transition: background-color 0.2s;
    border-radius: 5px;
    font-size: 24px !important;


    @media screen and (max-width: 600px) {
        display: flex;
    }

    :hover {
        background-color: #00b1b1;
    }
`

const AboutBody = styled.div`
    position: absolute;
    z-index: 999;
    transition: height 0.2s, opacity 0.2s;
    display: flex;
    flex-direction: column;
    height: 0;
    width: 100vw;
    background-color: #aee6e6;
    opacity: 0;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    box-sizing: border-box;
    padding: 20px;

    ${({open}) => open && `
        height: 100vh;
        pointer-events: auto;
        opacity: 1;
    `}
`

const AboutDirectory = styled.div`
    position: absolute; 
    top: 0px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    ${({ham}) => ham && `
        height: auto;
        z-index: 1000;
        background-color: #029696;
        flex-direction: column;
    `}
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
        display: none;
        margin: 0;
        ${({ham}) => ham && `
            width: 100%;
            display: flex;
            height: 75px;
            background-color: #029696;
        `}
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
        display: none;
        ${({ham}) => ham && `
            display: block;
            color: white;
        `}
    }

    ${({ selected }) => selected && `
        font-weight: 600;
    `}
`