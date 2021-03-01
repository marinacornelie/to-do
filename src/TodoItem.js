import React, {Component} from 'react'
import axios from 'axios';

class TodoItem extends Component {
 

  deleteTodo = (id) => {
    axios.delete('http://localhost:8080/api/v1/todos/' + id).then(
      () => {
        this.props.removeTodo(id)
      }
    )
  }


render() {
  return ( 
    <li>
      {this.props.value.title}: {this.props.value.description}
      <button onClick={() => {this.deleteTodo(this.props.value.id)}}>
        Delete this to do!
      </button>
    </li>  
   );
  }
}

export default TodoItem;