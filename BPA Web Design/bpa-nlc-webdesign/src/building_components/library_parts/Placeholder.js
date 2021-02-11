import React from 'react'
import styled from 'styled-components'

export default function Placeholder() {
    return (
        <PlaceHolderDiv>
            <PlaceHolderImage alt="" src="https://gifted-mclean-c050f4.netlify.app/images/undraw_adventure_4hum.svg"></PlaceHolderImage>
            <PlaceHolderTitle>Welcome to the BPA NLC planner! Use the search bar to find attractions, hotels, and other amenities in DC.</PlaceHolderTitle>
        </PlaceHolderDiv>
    )
}

const PlaceHolderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 95%;
    @media screen and (max-width: 600px) {
        margin-top: 10px;
    }
`

const PlaceHolderImage = styled.img`
    max-height: 250px;
    @media screen and (max-width: 600px) {
        width: 250px;
    }
`

const PlaceHolderTitle = styled.p`
    font-family: 'Lato', sans-serif;
    margin: 0;
    font-size: 16px;
    margin-top: 17.5px;
    user-select: none;
    color: rgba(0, 0, 0, 0.5);
`