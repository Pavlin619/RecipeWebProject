// home-page.js
import { LitElement, html, css } from "lit";
import { AppHeader } from "./header-component";
import "./recipe-component"; // Import the recipe-component

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
    window.dispatchEvent(
      new CustomEvent("vaadin-router-go", {
        detail: { pathname: `/recipes/${recipeId}` },
      })
    );
  }

  render() {
    console.log(this.recipes)
    return html`
      <app-header></app-header>
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
}

customElements.define("home-page", HomePage);
