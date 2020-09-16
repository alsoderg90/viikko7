import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { BrowserRouter as Router, 
    Switch, Link, Route} from 'react-router-dom'

ReactDOM.render(
<Router>
<App />
</Router>
,document.getElementById('root')
)