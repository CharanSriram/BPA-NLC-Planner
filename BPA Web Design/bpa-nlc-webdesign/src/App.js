import './App.css';
import React from 'react'
import Library from './building_components/Library'
import GMaps from './building_components/GMaps'
import Directory from  './building_components/Directory'
import About from './building_components/About'
import {store, addCard, switchView} from './redux_guts/redux'
import { db } from './db_guts/db'

function changeURL(url, title) {
  var new_url = '/' + url;
  window.history.pushState('data', title, new_url); 
}

class App extends React.Component {  
  constructor(props) {
    super(props)
  
    this.unsubscribe = undefined
    this.state = {
      currentPage : "Main App"
    }
  }
  
  storeDidUpdate = () => {
    if (store.getState().currentView !== this.state.currentPage) {
      this.setState({currentPage : store.getState().currentView})
      switch (store.getState().currentView) {
        case "Main App":
            changeURL("app", "NLC Hub")
            break;
        case "About":
            changeURL("about", "About")
            break;
        case "Contact":
            changeURL("contact", "Contact")
            break;
        case "Resources":
            changeURL("resources", "Resources")
            break;
        default: 
            return;
    }
    }
  }
  
  componentDidMount() {
    console.clear()
    this.unsubscribe = store.subscribe(this.storeDidUpdate);

    let dir = window.location.pathname;
    switch(dir) {
      case "/app":
        store.dispatch(switchView("Main App"))
        break;
      case "/about":
        store.dispatch(switchView("About"))
        break;
      case "/contact":
        store.dispatch(switchView("Contact"))
        break;
      case "/resources":
        store.dispatch(switchView("Resources"))
        break;
      default: 
        store.dispatch(switchView("Main App"))
        break;
    }

    db.collection('cards').get().then((snapshot) => {
      snapshot.forEach(doc => {
        let obj = {
          title: doc.data().title,
          description: doc.data().description,
          imageURL: doc.data().imageURL,
          address: doc.data().address,
          ratings: {
            expenseLevel: doc.data().ratings.expenseLevel,
            score: doc.data().ratings.score
          },
          type: doc.data().type
        }
        store.dispatch(addCard(doc.id, obj))
      })
    })
  }

  render() {
    return (
      <div className="App">
        <GMaps />
        <Library />
        <Directory />
        <About />
      </div>
    );
  }

}

export default App;
