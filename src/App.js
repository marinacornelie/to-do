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
        () => {
        this.getTodos()
        this.setState({title: '', description:''})
        }
      )
  }

  getTodos = () => {
    axios.get('http://localhost:8080/api/v1/todos').then(
      (response) => {
        console.log(response.data)
        this.setState({toDos: response.data})
      }
    )
  }

  deleteTodo = (id) => {
    axios.delete('http://localhost:8080/api/v1/todos/' + id).then(
      () => {
        this.setState((prevState) => ({
          toDos: prevState.toDos.filter(toDo => toDo.id !== id),
        }))
      }
    )
  }

  componentDidMount = () => {
    this.getTodos();
  }

  render() {   
    return (
      <div>
        <input 
          placeholder="Title" 
          value = {this.state.title}
          onChange={event => this.setState({title: event.target.value})} 
          />
        <input 
          placeholder="Description" 
          value = {this.state.description}
          onChange={event => this.setState({description: event.target.value})} />
        <button onClick={this.createTodo}>
                  Save!
        </button>
        <div className="column">
          <ul>
            {this.state.toDos.map((toDo, index) => (
              <li key={index}>
                {toDo.title}: {toDo.description}
                <button onClick={() => {this.deleteTodo(toDo.id)}}>
                  Delete this to do!
               </button>
               </li> ))}       
          </ul>
        </div>  
      </div>              
    )
  }
}

export default App
