import './App.css';
import React from 'react'
import Library from './building_components/Library'
import GMaps from './building_components/GMaps'
import {store, addCard} from './redux_guts/redux'
import { db } from './db_guts/db'

class App extends React.Component {  
  componentDidMount() {
    console.clear()
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
      </div>
    );
  }

}

export default App;
