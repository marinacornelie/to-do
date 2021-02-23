import React, {Component} from 'react'
import axios from 'axios';

class App extends Component {

  state = {
    title: '',
    description: '',
    toDos: [ ],
  }

  createTodo = () => {
      axios.post('http://localhost:8080/api/v1/todos', {title: this.state.title, description: this.state.description}).then(
        (response) => {
        this.getTodo()
        }
      )
  }

  getTodo = () => {
    axios.get('http://localhost:8080/api/v1/todos').then(
      (response) => {
        console.log(response.data)
        this.setState({toDos: response.data})
      }
    )
  }

  componentDidMount = () => {
    this.getTodo();
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
            {this.state.toDos.map((toDos, index) => (
              <li key={index}>{toDos.title}: {toDos.description}</li> ))}
          </ul>
        </div>  
      </div>              
    )
  }
}

export default App
