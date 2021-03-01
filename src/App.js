import React, {Component} from 'react'
import axios from 'axios';
import TodoItem from './TodoItem'

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

  removeTodoFromList = (id) => {
    this.setState((prevState) => ({
      toDos: prevState.toDos.filter(toDo => toDo.id !== id),
    }))
  }

  componentDidMount = () => {
    this.getTodos();
  }

  render() {   
    return (
      <div>
        <div onKeyPress={event => {
            if (event.key === "Enter") {
              this.createTodo();
            }
          }}>
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
        </div>
        <div className="column">
          <ul>
            {this.state.toDos.map((toDo, index) => ( 
              <TodoItem removeTodo={this.removeTodoFromList} key={index} value={toDo}/>
            ))}       
          </ul>
        </div>  
      </div>              
    )
  }
}

export default App
