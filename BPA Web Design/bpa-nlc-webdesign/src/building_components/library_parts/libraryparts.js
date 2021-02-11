import styled, {css} from 'styled-components'

export const LibraryBody = styled.div`
    z-index: 10;
    background-color: #FBF6F0;
    border-radius: 10px;
    height: calc(100% - 60px);
    top: 30px;
    position: fixed;
    left: 30px;
    width: 450px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
    box-sizing: border-box;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.25);
    transition: height 0.3s;

    @media screen and (max-width: 600px) {
        width: 300px;
    }

    ${({ collapsed }) => collapsed && `
        overflow: none;
        height: 100px;
    `}

    ${({ collapsed2 }) => collapsed2 && `
        overflow: none;
        height: 150px;

        @media screen and (max-width: 600px) {
            height: 200px;
        }
    `}

`
export const CollapseMenuButton = styled.div`
    min-height: 50px;
    min-width: 50px;
    border-radius: 25px;
    background-color: #FBF6F0;
    position: absolute;
    right: -70px;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.25);
    transition: background-color 0.2s;
    cursor: pointer;
    z-index: 10;
    user-select: none;

    :hover {
        background-color: #F6F1EB;
    }

    @media screen and (max-width: 410px) {
        top: auto;
        bottom: 10px;
        right: 10px;
        background-color: #029696;
        color: white;

        :hover {
            background-color: #00b1b1;
        }

        ${({ collapsed }) => collapsed && `
            bottom: -60px;
            right: 0px;
            color: black;
            background-color:  #FBF6F0;

            :hover {
                background-color: #F6F1EB;
            }
        `}
    }   
`
export const ExpandableMenuButton = styled.div`
    min-height: 50px;
    min-width: 50px;
    border-radius: 25px;
    background-color: #FBF6F0;
    position: absolute;
    right: -70px;
    top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.25);
    transition: background-color 0.2s;
    cursor: pointer;
    z-index: 10;
    user-select: none;

    :hover {
        background-color: #F6F1EB;
    }

    @media screen and (max-width: 410px) {
        top: auto;
        bottom: 10px;
        right: 70px;
        background-color: #029696;
        color: white;

        :hover {
            background-color: #00b1b1;
        }

        ${({ collapsed }) => collapsed && `
            bottom: -60px;
            right: 60px;
            color: black;
            background-color:  #FBF6F0;

            :hover {
                background-color: #F6F1EB;
            }
        `}
    }   
`

export const SearchBarContainer = styled.div`
    min-height: 60px;
    width: 100%;
    border-radius: 5px;
    background-color: rgba(174, 230, 230, 0.5);
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    align-items: center;
    transition: background-color 0.2s;
    box-sizing: border-box;

    :hover {
        background-color: rgba(174, 230, 230, 0.6);
    }
`

export const SearchBar = styled.input`
    width: 100%;
    margin-left: 10px;
    font-size: 14px;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    height: 80%;
    font-family: 'Lato', sans-serif;

    ::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }
`

export const ChipContainer = styled.div`
    width: 100%;
    height: 60px !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: auto;
    box-sizing: border-box;
    margin-top: 5px;
    
    ::-webkit-scrollbar {
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
        transition: background-color 0.2s;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

export const ResultsQuery = styled.p`
    font-family: 'Lato', sans-serif;
    font-weight: 200;
    font-size: 14px;
    color: black;
    margin-top: 20px;
    padding: 0;
    height: 24px !important;
    overflow: auto;
`

export const ResultsContainer = styled.div`
    height: 100%;
    width: calc(100% + 50px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: auto;
    padding-left: 25px;
    position: relative;
    right: 25px;

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

export const QuestionMark = styled.p`
    margin: 0;
    font-size: 14px;
`