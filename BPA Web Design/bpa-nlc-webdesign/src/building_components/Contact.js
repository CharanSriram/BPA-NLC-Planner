import React, { Component } from 'react'
import styled from 'styled-components'
import {QuestionMark} from './library_parts/libraryparts'
import { store, switchView } from '../redux_guts/redux' 

export default class Contact extends Component {
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
        (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
    }

    storeDidChange = () => {
        this.setState({open: store.getState().currentView === "Contact"})
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
                <LinkItem ham={this.state.menuOpen} onClick={() => this.handleLinkClick(1)}><LinkInner ham={this.state.menuOpen}>About</LinkInner></LinkItem>
                <LinkItem ham={this.state.menuOpen} onClick={() => this.handleLinkClick(2)}><LinkInner ham={this.state.menuOpen} selected={true}>Contact</LinkInner></LinkItem>
            </AboutDirectory>
            <CloseButton onClick={this.toggleHamBurger}><QuestionMark className="material-icons">menu</QuestionMark></CloseButton>
            <TypeFormHolder>
                <div className="typeform-widget" data-url="https://form.typeform.com/to/JamO6KdH?typeform-medium=embed-snippet" style={{width: "100%", height: "100%"}}></div>
            </TypeFormHolder>
            
        </AboutBody>
        )
    }
}


const TypeFormHolder = styled.div`
    height: 85%;
    width: calc(100% - 100px);
    border-radius: 5px;
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
    width: 100%;
    background-color: #aee6e6;
    opacity: 0;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    box-sizing: border-box;
    padding: 20px;

    ${({open}) => open && `
        height: 100%;
        min-height: 100%;
        overflow: none;
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
    font-family: 'Lato';

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
    font-family: 'Lato';

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
    font-family: 'Lato';

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