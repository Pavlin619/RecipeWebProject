// home-page.js
import { LitElement, html, css } from "lit";
import { AppHeader } from "./header-component";
import { RecipeComponent } from "./recipe-component";
import { AddRecipeForm } from "./add-recipe-component";
import { SearchComponent } from "./search-component";
import { Router } from '@vaadin/router';

class HomePage extends LitElement {
  static styles = css`
    .recipe-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: center;
      margin:10px;
    }
  `;

  static properties = {
    recipes: { type: Array },
  };

  constructor() {
    super();
    this.recipes = [];
    this.fetchRecipes();
    this.showAddRecipe = false;
    this.handleAddRecipeClicked = this.handleAddRecipeClicked.bind(this);
  }

  async fetchRecipes() {
    try {
      const response = await fetch("/users/recipes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.recipes = data;
    } catch (error) {
      console.error(error);
    }
  }

  handleRecipeClick(event) {
    const recipeId = event.detail.recipeId;
    console.log(recipeId)
    Router.go(`/recipe-details?recipeId=${recipeId}`)
  }

  render() {
    console.log(this.recipes)
    return html`
      <app-header @add-recipe-clicked=${this.handleAddRecipeClicked}></app-header>
      ${this.showAddRecipe ? html`<add-recipe-form @recipe-added=${this.handleRecipeAddedSuccessfully}></add-recipe-form>` : ''}
      <search-component @search=${this.handleSearch}></search-component>
      <div class="recipe-list">
        ${this.recipes.map(
          (recipe) => html`
            <recipe-component
              @recipe-click="${this.handleRecipeClick}"
              photo="${recipe.photo}"
              recipeName="${recipe.recipeName}"
              recipeId="${recipe._id}"
            ></recipe-component>
          `
        )}
      </div>
    `;
  }

  handleSearch(event) {
      const data = event.detail.data;
      this.recipes = data;
      this.requestUpdate();
  }

  handleAddRecipeClicked() {
    // Toggle the showAddRecipe property to show/hide add-recipe
    this.showAddRecipe = !this.showAddRecipe;
    this.requestUpdate();
  }

  handleRecipeAddedSuccessfully() {
    this.showAddRecipe = !this.showAddRecipe;
    this.fetchRecipes();
    this.requestUpdate();
  }
}

customElements.define("home-page", HomePage);
