import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './article-list';

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  state = this.props.store.getState()

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    const { articles } = this.state;
    return (
      <ArticleList
        articles={articles}
      />
    );
  }
}

export default App;
