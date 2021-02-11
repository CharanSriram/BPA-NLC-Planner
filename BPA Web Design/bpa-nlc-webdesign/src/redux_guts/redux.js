// using to communicate between Jquery and React because Google Maps for React doesn't work
import { createStore } from 'redux'

export const selectCard = cardID => {
    return {
        type: "SELECT_CARD",
        cardID
    }
}

export const deselectCard = () => {
    return {
        type: "DESELECT_CARD"
    }
}

export const toggleMenu = () => {
    return {
        type: "TOGGLE_MENU"
    }
}

export const toggleDirectoryMenu = () => {
    return {
        type: "TOGGLE_DIRECTORY"
    }
}

export const addCard = (cardID, data) => {
    return {
        type: "ADD_CARD",
        cardID,
        data
    }
}

export const switchView = (newView) => {
    return {
        type: "VIEW_SWITCH",
        newView
    }
}

function addCardHelper(state, cardID, data) {
    let temp = Object.assign(state)
    temp.infoList.allCards[cardID] = {
        title: data.title,
        description: data.description,
        type: data.type,
        imageURL: data.imageURL,
        address: data.address,
        ratings: {
            expenseLevel: data.ratings.expenseLevel,
            score: data.ratings.score
        }
    }
    temp.infoList.allIDs.push(cardID)
    switch(data.type) {
        case 0:
            temp.infoList.disneyWorldList.push(cardID);
            break;
        case 1:
            temp.infoList.universalStudioList.push(cardID);
            break;
        case 2:
            temp.infoList.seaworldList.push(cardID);
            break;
        case 3:
            temp.infoList.gardensList.push(cardID);
            break;
        default: 
            temp.infoList.disneyWorldList.push(cardID);
            break;
    }

    return temp;
}

function deselectCardHelper(state) {
    let temp = Object.assign(state);
    temp.cardSelectedID = "";
    return temp;
}

function cardSelectHelper(state, cardID) {
    let temp = Object.assign(state)
    temp.cardSelectedID = cardID
    return temp;
}

function collapseMenuHelper(state) {
    let temp = Object.assign(state)
    temp.collapsedMenu = !temp.collapsedMenu;
    return temp;
}

function directoryMenuHelper(state) {
    let temp = Object.assign(state)
    temp.directoryMenu = !temp.directoryMenu;
    return temp;
}

function switchViewHelper(state, view) {
    let temp = Object.assign(state)
    temp.currentView = view;
    return temp;
}

let alcTemplate = {
    "123" : {
        title: "Bob's burgers",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: 0,
        imageURL: "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
        address: "13854 Sorano Dr, Frisco, TX",
        ratings: {
            expenseLevel: 2,
            score: 5
        }
    }
}

let defaultState = {
    cardSelectedID : "",
    infoList: {
        allCards: {

        },
        disneyWorldList: [],
        seaworldList: [],
        universalStudioList: [],
        gardensList: [],
        allIDs: []
    },
    collapsedMenu: false,
    directoryMenu: false,
    currentView: "Main App"
}

const universalDataTracker = (state = defaultState, action) => {
    switch (action.type) {
        case "SELECT_CARD":
            return cardSelectHelper(state, action.cardID);
        case "DESELECT_CARD":
            return deselectCardHelper(state);
        case "TOGGLE_MENU":
            return collapseMenuHelper(state);
        case "TOGGLE_DIRECTORY":
            return directoryMenuHelper(state);
        case "ADD_CARD":
            return addCardHelper(state, action.cardID, action.data);
        case "VIEW_SWITCH":
            return switchViewHelper(state, action.newView);
        default: 
            return state;
    }
}

export const store = createStore(universalDataTracker)