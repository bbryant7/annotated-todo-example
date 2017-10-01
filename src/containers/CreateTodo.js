
// smart (stateful) component
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTodo} from "../actions";
// need to keep track of the data in our text field with local state
class CreateTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
// function updates local state when user changes text field
// udateText must be bound to this because it will be called by the onChange later, needs to hold context where it was created.
// event.target.value =
    updateText = (event) => {
        this.setState({text: event.target.value});
    }

    createTodo = (event) => {
        event.preventDefault();
        this.props.createTodo(this.state.text);
        this.setState({text: ""});
    }
// we pass a function to dispatch the action to the store and call that when the form is submitted.
// when enter is pressed onSubmit calls createTodo action creator
    render() {
        return (
            <div className="CreateTodo">
                <form onSubmit={this.createTodo}>
                    <input type="text" placeholder="Create a new todo" value={this.state.text} onChange={this.updateText}/>
                </form>
            </div>
        );
    }
}

// function takes state an argument and returns the app state the container needs
const mapStateToProps = function(state) {
    return {}
}

// takes dispatch as an argument. function calls Dispatch() with an action, binds action creator to dispatch and returns an object that is given to component as props.
const mapDispatchToProps = function(dispatch) {
    return {
        createTodo: function(text) {
            return dispatch(createTodo(text));
        }
    }
}

// connect is a a function imported from Redux, it allows you to connect the two map functions to thei component (CreateTodo in this case)
export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
