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
      width: 22%;
      margin: 1%;
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
    title: { type: String },
    imageUrl: { type: String },
    recipeId: { type: String },
  };

  constructor() {
    super();
    this.title = "Recipe Title";
    this.imageUrl =
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    this.recipeId = "65cb8a91d8ca86945f3298d4";
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
        <img class="recipe-image" src="${this.imageUrl}" alt="${this.title} Image" />
        <div class="recipe-title">${this.title}</div>
      </button>
    `;
  }
}

customElements.define("recipe-component", RecipeComponent);

