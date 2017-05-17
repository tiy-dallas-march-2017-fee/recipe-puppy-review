import React from 'react';
import $ from 'jquery';

class RecipePuppySearch extends React.Component {

  constructor() {
    super();
    this.state = {
      queryInputValue: '',
      liveQueryValue: ''
    }
  }

  queryForRecipes() {
    const url = `/api/recipes?foodQuery=${this.state.liveQueryValue}`;

    console.log('what url?', url);

    $.ajax({
      url: url
    })
    .done((data) => {
      console.log('data!', data);
    });
  }

  handleChange(evt) {
    this.setState({
      queryInputValue: evt.target.value
    });
  }

  handleKeyUp(evt) {
    if (evt.keyCode === 13) {
      this.setState({
        liveQueryValue: evt.target.value,
        queryInputValue: ''
      }, () => {
        this.queryForRecipes();
      });

    }
  }

  handleSearchClick() {
    this.setState({
      liveQueryValue: this.state.queryInputValue,
      queryInputValue: ''
    }, () => {
      this.queryForRecipes();
    });
  }

  render() {
    console.log('render state', this.state);
    return (
      <div>
        <input
          onChange={(evt) => this.handleChange(evt)}
          onKeyUp={(evt) => this.handleKeyUp(evt)}
          value={this.state.queryInputValue}
          />

        <button onClick={() => this.handleSearchClick()}>search</button>

      </div>
    );
  }

}

module.exports = RecipePuppySearch;
