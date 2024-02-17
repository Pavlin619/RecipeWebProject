import { LitElement, html, css } from "lit";
import { Router } from '@vaadin/router';

class SearchComponent extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-container {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      padding: 20px; /* Increase padding for a larger container */
      border-radius: 8px; /* Increase border-radius for rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Enhance box shadow */
    }

    input {
      padding: 12px; /* Increase padding for a larger input */
      margin-right: 16px; /* Increase margin for more space between input and button */
      border: 1px solid #ccc;
      border-radius: 6px; /* Increase border-radius for rounded corners */
      font-size: 16px; /* Increase font size for larger text */
      width: 200px; /* Set a specific width for the input */
    }

    button {
      padding: 12px; /* Increase padding for a larger button */
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 6px; /* Increase border-radius for rounded corners */
      cursor: pointer;
      font-size: 16px; /* Increase font size for larger text */
    }
  `;

  render() {
    return html`
      <input id="searchInput" type="text" placeholder="Search..." />
      <button @click=${this.handleSearchClick}>Search</button>
    `;
  }

  handleSearchClick() {
    const searchInput = this.shadowRoot.getElementById("searchInput");
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
      // Trigger your request with the searchTerm
      console.log("Search term:", searchTerm);

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(`http://localhost:8080/users/recipes/${searchTerm}`, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data successfully fetched:", data);

          const event = new CustomEvent("search", {
            detail: { data },
            bubbles: true,
            composed: true,
          });

          this.dispatchEvent(event);
          Router.go('/home#search')
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }
}

customElements.define("search-component", SearchComponent);
