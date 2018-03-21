import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './Router';

class App extends Component {

render() {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
    <RouterComponent />
    </Provider>
  );
}
}

export default App;
