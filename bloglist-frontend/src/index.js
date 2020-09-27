import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import store from './store'
import { Provider } from 'react-redux'
import { Page } from './components/StyledComponents'


const render = () => {
  ReactDOM.render(
    <Page>
      <Provider store={store}>
        <App />
      </Provider>
    </Page>, document.getElementById('root'))

}

render()
store.subscribe(render)
