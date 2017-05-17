import React from 'react';
import $ from 'jquery';

class RecipePuppySearch extends React.Component {

  componentDidMount() {
    $.ajax({
      url: '/api/recipes'
    })
    .done((data) => {
      console.log('data!', data);
    });
  }


  render() {
    return (
      <div>
        RecipePuppySearch
      </div>
    );
  }

}

module.exports = RecipePuppySearch;
