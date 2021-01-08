import React, { Component } from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip';
import {v4 as uuidv4} from 'uuid'

export default class RatingsBlock extends Component {
    render() {
        let priceArr = []
        let remainingPrice = 3;
        for (let i = 0; i < this.props.costScore; i++) {
            priceArr.push(<RatingValues key={uuidv4()} style={{fontFamily: "'Lato', sans-serif"}} active={true}>$</RatingValues>)
            remainingPrice--;
        }
        for (let i = 0; i < remainingPrice; i++) {
            priceArr.push(<RatingValues key={uuidv4()} style={{fontFamily: "'Lato', sans-serif"}} active={false}>$</RatingValues>)
        }

        let starArr = []
        let remainingStars = 5;
        for (let i = 0; i < this.props.starScore; i++) {
            starArr.push(<RatingValues key={uuidv4()} className="material-icons" active={true}>star</RatingValues>)
            remainingStars--;
        }
        for (let i = 0; i < remainingStars; i++) {
            starArr.push(<RatingValues key={uuidv4()} className="material-icons" active={false}>star</RatingValues>)
        }
        
        return (
            <RatingsWrapper>
                <Tooltip placement="bottom" title="Price rating out of 3">
                    <RatingContainer>
                        {priceArr}
                    </RatingContainer>
                </Tooltip>
                <Divider />
                <Tooltip placement="bottom" title="Rating out of 5 stars">
                    <RatingContainer>
                        {starArr}
                    </RatingContainer> 
                </Tooltip>
                <Divider />
                <Tooltip placement="bottom" title="This establishment requires masks and social distancing">
                    <RatingContainer style={{marginRight: "0px"}}>
                            <RatingValues className="material-icons" active={true}>masks</RatingValues>
                            <RatingValues className="material-icons" active={true}>6_ft_apart</RatingValues>
                    </RatingContainer>
                </Tooltip>
            </RatingsWrapper>
        )
    }
}


const RatingsWrapper = styled.div`
    width: 100%;
    min-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`

const Divider = styled.div`
    width: 1px;
    height: 95%;
    background-color: rgba(0, 0, 0, 0.2);
    margin-right: 15px;
    margin-left: 15px;

    @media screen and (max-width: 600px) {
        display: none;
    }
`

const RatingContainer = styled.div`
    display: flex;
    height: 100%;
    width: calc(33%-1px);
    flex-direction: row;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 600px) {
        margin-right: 10px;
    }
`

const RatingValues = styled.p`
    margin: 0;
    margin-right: 2.5px;
    margin-left: 2.5px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.25);
    user-select: none;


     ${({ active }) => active && `
        color: rgba(0, 0, 0, 1);
        font-weight: 600;
    `}
`
