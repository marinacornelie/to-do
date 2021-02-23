import React, {Component} from 'react'
import axios from 'axios';

class App extends Component {

  state = {
    title: '',
    description: ''
  }

  createTodo = () => {
      axios.post('http://localhost:8080/api/v1/todos', this.state)
  }

  getTodo = () => {
    axios.get('http://localhost:8080/api/v1/todos').then(
      (response) => {
        console.log(response.data)
      }
    )
  }

  render() {   
    return (
      <div>
        <input 
          placeholder="Title" 
          onChange={event => this.setState({title: event.target.value})} 
          />
        <input 
          placeholder="Description" 
          onChange={event => this.setState({description: event.target.value})} />
        <button onClick={this.createTodo}>
                  Save!
        </button>
        <div className="column">
          <ul>
          {this.getTodo()}
          </ul>
        </div>  
      </div>              
    )
  }
}

export default App
