import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
  // Container Components
  return class WithStore extends React.PureComponent {
    static contextTypes = {
      store: PropTypes.object
    }

    static displayName = `${Component.name}Container`
    
    usedState = () => {
      return extraProps(this.context.store, this.props);
    }

    state = this.usedState()

    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }
    
    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
      this.subscriptionId = null;
    }
  
    onStoreChange = () => {
      if (this.subscriptionId) {
        this.setState(this.usedState());
      }
    }


    render() {
      return (
        <Component
          {...this.props}
          {...this.usedState()}
          store={this.context.store}
        />
      );
    }
  };
};

export default storeProvider;
