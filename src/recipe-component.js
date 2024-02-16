import { LitElement, html, css } from 'lit';

class RecipeComponent extends LitElement {
  static styles = css`
    .recipe-container {
      background-color: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 22%; /* Adjust the width as needed */
      margin: 1%; /* Adjust the margin as needed */
      display: inline-block; /* Display recipes in a row */
      box-sizing: border-box; /* Include padding and border in width/height */
    }

    .recipe-image {
        width: 100%;
        height: 60%; /* Adjust the height as needed */
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        object-fit: cover; /* Maintain aspect ratio and cover container */
      }
  
      .recipe-title {
        padding: 10px;
        font-size: 14px; /* Adjust the font size as needed */
        color: #333;
      }
  `;

  static properties = {
    title: { type: String },
    imageUrl: { type: String },
  };

  constructor() {
    super();
    this.title = 'Recipe Title';
    this.imageUrl = 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  render() {
    return html`
      <div class="recipe-container">
        <img class="recipe-image" src="${this.imageUrl}" alt="${this.title} Image">
        <div class="recipe-title">${this.title}</div>
      </div>
    `;
  }
}

customElements.define('recipe-component', RecipeComponent);