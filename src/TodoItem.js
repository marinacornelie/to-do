import React, {Component} from 'react'
import axios from 'axios';

class TodoItem extends Component {
  
  state = {
    showDetails: false,
    done: this.props.value.done
  }

  deleteTodo = (id) => {
    axios.delete('http://localhost:8080/api/v1/todos/' + id).then(
      () => {
        this.props.removeTodo(id)
      }
    )
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }))
  }

  toggleDone = (checked) => {
    const todo = this.props.value
    const data = {title: todo.title, description: todo.description, done: checked}
    axios.patch('http://localhost:8080/api/v1/todos/' + todo.id, data).then(
      () => {
        console.log(checked)
        this.setState({done: checked})
      }
    )
  }  
  
render() {
  return ( 
    <li className="m-2">
      <div className="p-4 card">
        <div className="is-flex is-justify-content-space-between">
          <div>
            <input className="mr-2" checked={this.state.done} type="checkbox" onChange={(e) => {this.toggleDone(e.target.checked)}}></input>  
            <span className={this.state.showDetails ? "todo-title-active" : " "}>
              {this.props.value.title}
            </span>   
          </div>
          <span className={this.state.showDetails ? "todo-arrow up" : "todo-arrow"} onClick={this.toggleDescription}>&#9660;</span>        
        </div>
        <div hidden = {!this.state.showDetails}>
          <div className="is-flex mt-2">
            <button className="delete is-small mr-2" onClick={() => {this.deleteTodo(this.props.value.id)}}></button>
            <span>{this.props.value.description}</span>
          </div>  
        </div>
      </div>
    </li>  
   )
  }
}

export default TodoItem;