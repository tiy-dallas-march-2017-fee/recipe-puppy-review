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

  componentDidMount() {
    $.ajax({
      url: '/api/recipes'
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
      });
    }
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

        RecipePuppySearch
      </div>
    );
  }

}

module.exports = RecipePuppySearch;
