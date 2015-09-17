import React, { Component } from 'react';
import Sortable from '../src/react-motion-sortable';

import './main.scss';

class App extends Component {
  state = {
    items: [
      {
        id: '01',
        text: 'apples'
      }, {
        id: '02',
        text: 'oranges'
      }, {
        id: '03',
        text: 'pears'
      }, {
        id: '04',
        text: 'bananas'
      }
    ]
  }

  _handleChange(items) {
    //console.log(items);
    //this.setState({items});
  }
  
  render() {
    const { items } = this.state;

    return(
      <div>
        <Sortable
          component="ul"
          className="list"
          springConfig={[300, 50]}
          onChange={this._handleChange.bind(this)}
        >
          {items.map(item => <li key={item.id} className="item">{item.text}</li>)}
        </Sortable>
      </div>
    );
  }
}

React.render(<App />, document.body);