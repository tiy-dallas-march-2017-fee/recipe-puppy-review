import React from 'react';
import $ from 'jquery';
import './RecipePuppySearch.css';

class RecipePuppySearch extends React.Component {

  constructor() {
    super();
    this.state = {
      queryInputValue: '',
      liveQueryValue: '',
      recipes: [],
      filterInputValue: '',
      filters: []
    }
  }

  queryForRecipes() {
    const url = `/api/recipes?foodQuery=${this.state.liveQueryValue}&ingredientQuery=${this.state.filters.join()}`;

    //console.log('what url?', url);

    $.ajax({
      url: url
    })
    .done((data) => {

      const fixedData = data.results.map((recipe) => {

        //Fixing the thumbnail
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


  handleFilterInputChange(evt) {
    this.setState({
      filterInputValue: evt.target.value
    });
  }

  handleFilterOnKeyUp(evt) {
    if (evt.keyCode === 13) {

      const filterArray = this.state.filters.slice();
      filterArray.push(this.state.filterInputValue);

      this.setState({
        filterInputValue: '',
        filters: filterArray
      }, () => {
        this.queryForRecipes();
      });
    }
  }

  handleRecipeClick(recipe) {
    $.ajax({
      method: 'POST',
      url: '/api/recipe',
      data: {
        title: recipe.title,
        href: recipe.href
      }
    })
    .done((data) => {
      console.log('post complete');
    });
  }

  render() {
    console.log('render state', this.state);

    const items = this.state.recipes.map((recipe, i) => {
      return <li key={i + recipe.title} onClick={() => this.handleRecipeClick(recipe)}>
        <img src={recipe.thumbnail} alt={recipe.title} />
        {recipe.title}
      </li>
    });

    let filter;
    if (this.state.recipes.length > 0) {

      const filters = this.state.filters.map((filter, i) => {
        return <li key={i + filter}>{filter}</li>
      });

      filter = <div>
        <input
          onChange={(evt) => this.handleFilterInputChange(evt)}
          onKeyUp={(evt) => this.handleFilterOnKeyUp(evt)}
          value={this.state.filterInputValue}
          />

        <ol>
          {filters}
        </ol>
      </div>
    }


    return (
      <div className="recipe-puppy-search">
        <input
          onChange={(evt) => this.handleChange(evt)}
          onKeyUp={(evt) => this.handleKeyUp(evt)}
          value={this.state.queryInputValue}
          />

        <button onClick={() => this.handleSearchClick()}>search</button>

        {filter}

        <ol>
          {items}
        </ol>

      </div>
    );
  }

}

module.exports = RecipePuppySearch;
