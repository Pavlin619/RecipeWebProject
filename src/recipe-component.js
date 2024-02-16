// recipe-component.js
import { LitElement, html, css } from "lit";

class RecipeComponent extends LitElement {
  static styles = css`
    .recipe-container {
      background-color: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 20rem;
      height:20rem;
      margin: 5%;
      display: inline-block;
      box-sizing: border-box;
      border-color: white;
    }

    .recipe-image {
      width: 100%;
      height: 60%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      object-fit: cover;
    }

    .recipe-title {
      padding: 10px;
      font-size: 14px;
      color: #333;
    }
  `;

  static properties = {
    recipeName: { type: String },
    photo: { type: String },
    recipeId: { type: String },
  };

  constructor() {
    super();
     }

  submitHandler() {
    this.dispatchEvent(
      new CustomEvent("recipe-click", {
        detail: { recipeId: this.recipeId },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <button @click="${this.submitHandler}" class="recipe-container">
        <img class="recipe-image" src="${this.photo}" alt="${this.title} Image" />
        <div class="recipe-title">${this.recipeName}</div>
      </button>
    `;
  }
}

customElements.define("recipe-component", RecipeComponent);

