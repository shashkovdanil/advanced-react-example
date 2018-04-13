import React from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './store-provider';

class SearchBar extends React.PureComponent {
  state = {
    searchTerm: ''
  }

  doSearch = debounce(() => {
    this.props.doSearch(this.state.searchTerm);
  }, 300)

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    }, () => {
      this.doSearch();
    });
  }

  render() {
    const { searchTerm } = this.state;
    return (
      <input
        type="search"
        placeholder="Enter search term"
        onChange={this.handleSearch}
        value={searchTerm}
      />
    );
  }
}

const extraProps = (store) => ({
  doSearch: store.setSearchTerm
});

export default storeProvider(extraProps)(SearchBar);
