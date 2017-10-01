// import immutibility-helper dependency to access
import update from 'immutability-helper';
import {CREATE_TODO, TOGGLE_TODO, FILTER_TODOS} from "./actions";
// for state you need two things: 1. a list of todo objects with a text and done status  and 2. current filter
// state must also include an id mechanism because we are not using a DB to create ids for us.
// set initial stater here
  // - "all because our initial filter will be all todos"
const initialState = {
    nextId: 1,
    todos: [],
    filter: 'all'
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// a very simple reducer function could look like this:
// const reducer = function (state, action) {
//   return state;
// }
//
// export default reducer;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// within reducer, use switch case to identify 3 potential actions the application can produce. reducer takes state and action as arguments, state is set to initial state inside argument. "action.type" is a redux key that references all potential actions.
  // - if action type === CREATE_TODO the state is updated to add a todo. new todo's always set to false.
  // $push is syntax made available by immutibility-helper
  // nextId: automatically creates a new id if current is used to create a todo
  // the text that will be visible is the action payload (value comes from input)
const reducer = function(state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO:
            return update(state, {
                todos: {
                    $push: [
                        {
                            text: action.payload,
                            id: state.nextId,
                            done: false
                        }
                    ]
                },
                nextId: {
                    $apply: (id) => id + 1
                }
            })
      // if action.type === TOGGLE_TODO we need to update the todo (from false to true)
      // must convert todo id to an index, id is defined by payload
      // $apply allow you to set done boolean value to the opposite of current value
        case TOGGLE_TODO:
            const idx = state.todos.findIndex((todo) => todo.id === action.payload);
            return update(state, {
                todos: {
                    [idx]: {
                        done: {
                            $apply: (done) => !done
                        }
                    }
                }
            })
        // if action.type === FILTER_TODOS action.payload is the filterType string
        case FILTER_TODOS:
            return update(state, {
                filter: {
                    $set: action.payload
                }
            })
        default:
            return state;
    }
}

export default reducer;
