import { LitElement, html, css } from "lit";
import { AppHeader } from "./header-component";
import { RecipeComponent } from "./recipe-component";

class HomePage extends LitElement {
  static styles = css``;

  render() {
    return html`
      <app-header></app-header>
      <recipe-component
        image-url="https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Delicious Pasta"
      ></recipe-component>
    `;
  }
}

customElements.define("home-page", HomePage);
