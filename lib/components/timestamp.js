import React from 'react';
import storeProvider from './store-provider';

class Timestamp extends React.PureComponent {
  static getTime = (time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
  render() {
    return (
      <div>
        {this.props.timestampDisplay}
      </div>
    );
  }
}

const extraProps = (store) => ({
  timestampDisplay: Timestamp.getTime(store.getState().timestamp)
});

export default storeProvider(extraProps)(Timestamp);
