import { LitElement, html, css } from "lit";
import "./comments-component"

class RecipePage extends LitElement {
  static styles = css`
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border-radius: 5%;
      flex-direction: column;
      border-color: solid 10px orange;
      width: 80%;
      height: 80%;
    }
    #recipe-name {
      color: orange;
      padding: 0.6rem;
      font-size: xx-large;
    }
    #img {
      margin: 2rem;
    }
    div {
      justify-content: left;
      width: 60%;
    }
    #list {
      list-style: decimal;
    }
  `;

  static properties = {
    recipeId: { type: String },
    recipe: { type: Object },
  };

  constructor() {
    super();
    this.recipeId = "";
    this.recipe = null;
    this.fetchRecipeById();
  }

  async fetchRecipeById() {
    try {
      // Retrieve the recipeId from the local storage
      const searchParams = new URLSearchParams(window.location.search);
      const recipeId = searchParams.get('recipeId');
      this.recipeId = recipeId;
console.log('Component', recipeId)
      // Fetch the recipe data using the recipeId
      const response = await fetch(`/users/recipe-details/${recipeId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
     
      // Parse the response JSON and set it to the recipe property
      this.recipe = await response.json();
      console.log(this.recipe)
      // Trigger a re-render to update the UI with the fetched recipe data
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    console.log('recipeId', this.recipeId);

    // Check if recipe data is available
    if (!this.recipe) {
      return html`<div>Loading...</div>`; // Display loading message while fetching recipe
    }

    // Render the recipe details
    return html`
      <app-header></app-header>
      <section>
        <h1 id="recipe-name">${this.recipe.recipeName}</h1>
        <img id="img" src="${this.recipe.photo}" />
        <div id="ingredients">
          <h2>Ingredients</h2>
          <hr />
          <p>${this.recipe.ingredients}</p>
        </div>
        <div id="Directions">
          <h2>Directions</h2>
          <hr />
          <p id="text-directtions">${this.recipe.directions}</p>
        </div>
      </section>
      <comment-form id="${this.recipeId}"></comment-form>
    `;
  }
}

customElements.define("recipe-page", RecipePage);
