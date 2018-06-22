import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsApi from './utils/ContactsApi'
import { Route } from 'react-router-dom'

/*const contacts = []
{
  "id": "ryan",
  "name": "Ryan Florence",
  "email": "ryan@reacttraining.com",
  "avatarURL": "http://localhost:5001/ryan.jpg"
},
{
  "id": "michael",
  "name": "Michael Jackson",
  "email": "michael@reacttraining.com",
  "avatarURL": "http://localhost:5001/michael.jpg"
},
{
  "id": "tyler",
  "name": "Tyler McGinnis",
  "email": "tyler@reacttraining.com",
  "avatarURL": "http://localhost:5001/tyler.jpg"
}
]*/
/*The contacts array living outside of the component has no relation with
component itself. If the contacts array has to be bound to the component,
it has to be moved within the component and initialized as component's state

When we do this, React will be managing the UI of the component based on its state*/

/*Passing function as a prop to child component:
Since the state which we need to modify on click of remove button resides in 
base component and the remove button resides in child component, here is how we
hook up both together:
- create a function in base component to modify the state - remove an item
- pass this function as a prop to child component
- in child component, on click of Remove button, invoke the function by accessing
from props by passing appropriate contact to remove*/
class App extends Component {
  state = {
    contacts: [
      /* {
         "id": "ryan",
         "name": "Ryan Florence",
         "email": "ryan@reacttraining.com",
         "avatarURL": "http://localhost:5001/ryan.jpg"
       },
       {
         "id": "michael",
         "name": "Michael Jackson",
         "email": "michael@reacttraining.com",
         "avatarURL": "http://localhost:5001/michael.jpg"
       },
       {
         "id": "tyler",
         "name": "Tyler McGinnis",
         "email": "tyler@reacttraining.com",
         "avatarURL": "http://localhost:5001/tyler.jpg"
       }*/
    ]
  }

  componentDidMount() {
    ContactsApi.getAll().then((contacts) => {
      this.setState({ contacts })//similar to this.setState({contacts : contacts})
      //since both are of same name this syntax can be used
    })
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      //remove the contact with id passed
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))//If new state is based on current state

    ContactsApi.remove(contact)
    /* this.setState({
 
     })*///If state is independent of current state
  }

  createContact = (contact) =>{
    ContactsApi.create(contact).then(contact => {
      this.setState(state => ({
        contacts:state.contacts.concat([contact])
      }))//Concat the contact we just created into the state
    })
  }
  render() {
    return (
      <div className="app">
        {/*Rendering based on state - screen - Back button wouldn't work*/}
        {/*{this.state.screen === 'list' && (
          < ListContacts contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            onNavigateToCreate={() => {this.setState({ screen: 'create' })
            }} />
        )}
        {this.state.screen === 'create' && (
          <CreateContact />
        )}*/}

        {/* use render with Route if component expects come props*/}
       
        <Route exact path='/' render={() => (
          <ListContacts contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            />
        )} />

        {/*To render component directly, use component with Route
        <Route path='/create' component={CreateContact}  />*/}

        {/*To redirect to another page after create contact, use history prop*/}
        <Route path='/create' render ={({history})=> (
          <CreateContact 
          onCreateContact ={(contact) => {this.createContact(contact)
          history.push('/')}}
          />
        )} />
      </div>
    );
  }
}

export default App;