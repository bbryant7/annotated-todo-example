// three actions for the the three behaviors the application will use.
export const CREATE_TODO = 'CREATE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const FILTER_TODOS = 'FILTER_TODOS';

// Can have a seperate action creator function for each action, but the alternative is an example of DRY code

// to creat a todo you need todo TEXT, thus the payload is text. Type matches action, payload matches data needed for action.
// export const createTodo = function (text) {
//   return {
//     type: CREATE_TODO,
//     payload: text
//   }
// }
//
 // to change done status you need the id or index of specific todo, here using Ids. Type matches action, payload matches data needed for action.
// export const toggleTodo = function (id) {
//   return {
//     type: TOGGLE_TODO,
//     payload: id
//   }
// }
// to filter  todos use a a string called filterType
// export const filterTodos = function (filterType) {
//   return {
//     type: FILTER_TODOS,
//     payload: filterType
//   }
// }

const makeActionCreator = function (actionType) {
  return function (payload) {
    return {
      type: actionType,
      payload: payload
    }
  }
}

export const createTodo = makeActionCreator(CREATE_TODO);
export const toggleTodo = makeActionCreator(TOGGLE_TODO);
export const filterTodos = makeActionCreator(FILTER_TODOS);
