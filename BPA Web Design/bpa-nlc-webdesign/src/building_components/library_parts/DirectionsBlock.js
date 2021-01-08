import React, { Component } from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip';

export default class DirectionsBlock extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            startLocation: ""
        }
    }
    
    onChange = (e) => {
        this.setState({startLocation : e.target.value})
    }

    handleAutoAddressClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let url = new URL("https://api.geocod.io/v1.6/reverse")
                let params = {q: position.coords.latitude + ", " + position.coords.longitude, api_key:"afb2b5b6ba6f4525df26fa56fb2d6aad6a22b6f"}
                url.search = new URLSearchParams(params).toString()

                fetch(url).then(response => response.json()).then(data => {
                    this.setState({
                        startLocation: data.results[0].formatted_address
                    })
                })
            })
        } else {
            alert("There was a problem finding your address!")
        }
    }

    handleDirectionsClick = () => {
        if (this.state.startLocation !== "" && this.props.address !== "")
            window.location.href = `https://google.com/maps/dir/${this.state.startLocation}/${this.props.address}`
        else {
            alert("Please fill out both fields!")
        }
    }

    render() {
        return (
            <DirectionsWrapper>
                <InputWrapper>
                    <AestheticsContainer>
                        <AestheticsCircle />
                    </AestheticsContainer>
                    <InputBody onChange={this.onChange} value={this.state.startLocation} placeholder="Enter your address..."></InputBody>
                    <Tooltip placement="bottom" title="Click to use your current location">
                        <AutoFillButton onClick={this.handleAutoAddressClick}><AutoFillButtonContents className="material-icons">location_searching</AutoFillButtonContents></AutoFillButton>
                    </Tooltip>
                </InputWrapper>
                <InputWrapper>
                    <AestheticsContainer>
                        <AestheticsCircle />
                    </AestheticsContainer>
                    <InputBody value={this.props.address} readOnly={true}></InputBody>
                </InputWrapper>
                <RouteButton onClick={this.handleDirectionsClick}>Find Directions</RouteButton>
            </DirectionsWrapper>
        )
    }
}

const DirectionsWrapper = styled.div`
    width: 100%;
    min-height: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-top: 7px;
`

const InputWrapper = styled.div`
    height: 50px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    transition: background-color 0.2s;

    :hover {
        background-color: rgb(247.5, 247.5, 247.5);
    }
`

const InputBody = styled.input`
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    height: 100%;
    width: 100%;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    padding-right: 5px;

    ::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
`

const AutoFillButton = styled.div`
    background-color: #FFDA77;
    border-radius: 5px;
    min-height: 35px;
    min-width: 35px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s;

    :hover {
        background-color: #F9D36E;
    }
`

const AutoFillButtonContents = styled.p`
    font-size: 14px;
    margin: 0;
    user-select: none;
`

const AestheticsContainer = styled.div`
    height: 100%;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AestheticsCircle = styled.div`
    background-color: #AEE6E6;
    min-height: 12.5px;
    min-width: 12.5px;
    border-radius: 6.25px;
`

const RouteButton = styled.button`
    outline: none;
    border: none;
    width: 100%;
    height: 45px;
    border-radius: 5px;
    background-color: #FFDA77;
    transition: background-color 0.2s;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.75);

    :hover {
        background-color: #F9D36E;
    }
`


