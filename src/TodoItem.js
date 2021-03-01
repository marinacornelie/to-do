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
      showDetails: !prevState.showDetails,
    }))
  }


render() {
  return ( 
    <li>
      <div onClick={this.toggleDescription}>
        {this.props.value.title}
      </div>
      <div hidden = {!this.state.showDetails}>
        {this.props.value.description}
      </div>
      <button onClick={() => {this.deleteTodo(this.props.value.id)}}>
        Delete this to do!
      </button>
    </li>  
   );
  }
}

export default TodoItem;