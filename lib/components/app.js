import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickBy';
import ArticleList from './article-list';
import SearchBar from './search-bar';

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

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
  }
  
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  render() {
    let { searchTerm, articles } = this.state;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (searchTerm) articles = pickBy(
      articles,
      (value) => (
        value.title.toLowerCase().match(lowerCaseSearchTerm) ||
        value.body.toLowerCase().match(lowerCaseSearchTerm)
      )
    );
    return (
      <Fragment>
        <SearchBar
          doSearch={this.props.store.setSearchTerm}
        />
        <ArticleList
          articles={articles}
        />
      </Fragment>
    );
  }
}

export default App;
