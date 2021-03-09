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
    <li className="m-1">
      <div className="p-1 card" onClick={this.toggleDescription}>
        <span className="todo-title">
        {this.props.value.title}
        </span>
        <button className="delete" onClick={() => {this.deleteTodo(this.props.value.id)}}></button>
      </div>
      <span className="p-1" hidden = {!this.state.showDetails}>
        {this.props.value.description}
      </span>     
    </li>  
   );
  }
}

export default TodoItem;