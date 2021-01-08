import React, { Component } from 'react'
import styled from 'styled-components'
import { store, selectCard } from '../redux_guts/redux' 

const CardWrapper = styled.div`
    min-height: 100px;
    height: auto;
    width: calc(100% - 25px);
    margin-bottom: 10px;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
    flex-direction: row;
    overflow: hidden;
    transition: background-color 0.2s;
    
    :hover {
        background-color: rgb(247.5, 247.5, 247.5);
    }
`

const CardStripe = styled.div`
    height: 100%;
    min-width: 10px;
    width: 12.5px;
    background-color: #FFDA77;
`

const CardMainBody = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    padding: 10px;
    align-items: flex-start;
    cursor: pointer;
`

const Title = styled.p`
    margin: 0px;
    margin-top: 5px;
    font-family: 'Lato';
    font-weight: 600;
    font-size: 18px;
    user-select: none;
    text-align: left;
`

const Description = styled.p`
    margin: 0px;
    font-family: 'Roboto';
    margin-top: 7.5px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    user-select: none;
    text-align: left;
`

export default class card extends Component {
    handleClick = () => {
        store.dispatch(selectCard(this.props.id))
    }

    render() {
        let card = store.getState().infoList.allCards[this.props.id];
        if (card !== undefined) {
            return (
                <CardWrapper onClick={this.handleClick}>
                    <CardStripe />
                    <CardMainBody>
                        <Title>{card.title}</Title>
                        <Description>{card.description}</Description>
                    </CardMainBody>
                </CardWrapper>
            )
        }
        return <div></div>
    }
}
