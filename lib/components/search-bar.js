import React from 'react';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
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

export default SearchBar;
