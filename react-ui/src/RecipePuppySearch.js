import React from 'react';
import $ from 'jquery';
import './RecipePuppySearch.css';

class RecipePuppySearch extends React.Component {

  constructor() {
    super();
    this.state = {
      queryInputValue: '',
      liveQueryValue: '',
      recipes: []
    }
  }

  queryForRecipes() {
    const url = `/api/recipes?foodQuery=${this.state.liveQueryValue}`;

    console.log('what url?', url);

    $.ajax({
      url: url
    })
    .done((data) => {

      const fixedData = data.results.map((recipe) => {

        let thumbnail = recipe.thumbnail !== '' ? recipe.thumbnail : 'no-image-available.png';

        return {
          href: recipe.href,
          ingredients: recipe.ingredents,
          thumbnail: thumbnail,
          title: recipe.title
        };
      });


      this.setState({
        recipes: fixedData
      })
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

    const items = this.state.recipes.map((recipe, i) => {
      return <li key={i + recipe.title}>
        <img src={recipe.thumbnail} alt={recipe.title} />
        {recipe.title}
      </li>
    });


    return (
      <div className="recipe-puppy-search">
        <input
          onChange={(evt) => this.handleChange(evt)}
          onKeyUp={(evt) => this.handleKeyUp(evt)}
          value={this.state.queryInputValue}
          />

        <button onClick={() => this.handleSearchClick()}>search</button>

        <ol>
          {items}
        </ol>

      </div>
    );
  }

}

module.exports = RecipePuppySearch;
