import { LitElement, html, css } from 'lit';

class AddRecipeForm extends LitElement {
  static get properties() {
    return {
      recipeName: { type: String },
      imageUrl: { type: String },
      ingredients: { type: String },
      directions: { type: String },
    };
  }

  constructor() {
    super();
    this.recipeName = '';
    this.imageUrl = '';
    this.ingredients = '';
    this.directions = '';
  }

  static styles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    position: relative; /* Ensure relative positioning for z-index to work */
  }

  .form-container {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
    position: absolute; /* Position the form absolutely within the host */
    z-index: 1; /* Set a higher z-index to appear above other elements */
  }

  .form-container input,
  .form-container textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    box-sizing: border-box;
  }

  .form-container button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

  render() {
    return html`
      <div class="form-container">
        <h2>Add Recipe</h2>
        <form @submit=${this.handleSubmit}>
          <label for="recipeName">Recipe Name:</label>
          <input type="text" id="recipeName" name="recipeName" required>

          <label for="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="photo" required>

          <label for="ingredients">Ingredients:</label>
          <textarea id="ingredients" name="ingredients" rows="4" required></textarea>

          <label for="directions">Directions:</label>
          <textarea id="directions" name="directions" rows="4" required></textarea>

          <button type="submit">Add Recipe</button>
        </form>
      </div>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const username = window.localStorage.getItem('username');

    fetch(`http://localhost:8080/users/${username}/recipes`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully fetched:", data);

        const event = new CustomEvent('recipe-added', {
            bubbles: true,
            composed: true,
          });
      
          this.dispatchEvent(event);
      })
      .catch((error) => console.error("Fetch error:", error));
  }
}

customElements.define('add-recipe-form', AddRecipeForm);