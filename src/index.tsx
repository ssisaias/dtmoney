import React from 'react';
import ReactDOM from 'react-dom';
import {createServer} from 'miragejs';
import {App} from './App';

createServer({
  routes() {
    this.urlPrefix = 'https://code.isaiasdevlog.com/proxy/3000'
    this.namespace = 'api';
    this.get('/transactions', () => {
      return[
        {id:1, title: 'Transaction 1', amout: 400, type: 'deposit', category: 'Food', createdAt: new Date()}
      ]
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
