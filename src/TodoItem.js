import React, {Component} from 'react'
import axios from 'axios';

class TodoItem extends Component {
  
  state = {
    showDetails: false,
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


render() {
  return ( 
    <li className="m-2">
      <div className="p-3 card">
        <div className="is-flex is-justify-content-space-between" onClick={this.toggleDescription}>
          <span className="todo-title">
          {this.props.value.title}
          </span>
          <button className="delete" onClick={() => {this.deleteTodo(this.props.value.id)}}></button>
        </div>
        <span hidden = {!this.state.showDetails}>
        {this.props.value.description}
        </span>  
      </div>
    </li>  
   );
  }
}

export default TodoItem;