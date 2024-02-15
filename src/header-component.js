import { LitElement, html, css } from "lit";

class AppHeader extends LitElement {
  static styles = css`
    header {
      background-image: url("./header-background.jpg");
      color: #fff;
      padding: 15px;
      text-align: center;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo img {
      width: 40px; /* Adjust the width of the icon as needed */
      height: 40px; /* Adjust the height of the icon as needed */
      margin-right: 10px;
    }

    h1 {
      margin: 0;
    }

    nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    nav li {
      display: inline;
      margin-right: 20px;
    }

    nav a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
    }

    .buttons {
      margin-top: 15px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
    }

    #createRecipeBtn {
      background-color: #2ecc71;
      color: #fff;
    }

    #profileBtn {
      background-color: orange;
      color: #fff;
    }

    .labels-buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `;

  render() {
    return html`
      <header>
        <div class="header-content">
          <div class="logo">
            <!-- Placeholder for an icon, you can replace it with your preferred icon image -->
            <img src="./components/recipe_logo.png" alt="Recipe Icon" />
          </div>
          <div class="labels-buttons">
            <div class="labels">
              <nav>
                <ul>
                  <li><a href="#recipes">Recipes</a></li>
                  <li><a href="#about">About</a></li>
                </ul>
              </nav>
            </div>
            <div class="buttons">
              <button
                id="createRecipeBtn"
                @click=${this.handleCreateRecipeClick}
              >
                Create a Recipe
              </button>
              <button id="profileBtn" @click=${this.handleProfileClick}>
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  handleCreateRecipeClick() {
    // Your logic for the 'Create a Recipe' button click
    console.log("Create a Recipe button clicked");
  }

  handleProfileClick() {
    // Your logic for the 'Go to Profile' button click
    console.log("Go to Profile button clicked");
  }
}

customElements.define("app-header", AppHeader);