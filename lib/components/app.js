import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from './article-list';
import SearchBar from './search-bar';
import Timestamp from './timestamp';

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  appState = () => {
    const { searchTerm, articles } = this.props.store.getState();
    return { searchTerm, articles };
  }

  state = this.appState()

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  
  
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  

  onStoreChange = () => {
    this.setState(this.appState());
  }

  render() {
    let { searchTerm, articles } = this.state;
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) articles = pickBy(
      articles,
      (value) => (
        value.title.match(searchRE) ||
        value.body.match(searchRE)
      )
    );
    return (
      <Fragment>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </Fragment>
    );
  }
}

export default App;
