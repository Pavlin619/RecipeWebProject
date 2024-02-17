import { LitElement, html, css } from "lit";
import { io } from "socket.io-client";

class CommentSheme extends LitElement {
  #socket = null;

  static styles = css`
    #comments {
      display: flex;
      justify-content: left;
      align-items: start;
      background-color: white;
      flex-direction: column;
      width: 80%;
      height: 80%;
      background-color: orange;
      padding: 1rem;
      margin: 0.5rem;
    }

    #comments ul {
      list-style: none;
    }
    #comments ul li {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
    }
    #addComment {
      width: 100%;
    }
    #inputComment {
      width: 80%;
      border-color: orange;
      padding: 5px;
    }
    #inputComment:hover {
      border-color: rgb(243, 241, 239);
    }

    #addComment button {
      border-color: orange;
      background-color: white;
      border-radius: 1rem;
      padding: 5px;
      color: green;
    }
    #addComment button:hover {
      border-color: rgb(243, 241, 239);
    }
    p {
      margin: 10px;
    }
  `;

  static properties = {
    id: { type: String },
    comments: { type: Array }
  };

  constructor() {
    super();
    this.comments = [];
    this.#socket = io("http://localhost:8080");
    this.#socket.on("message", (message) => {
      this.comments.push(message);
      console.log('Comments', this.comments);
      this.requestUpdate();
    });
  }

  async fetchData() {
    try {
      console.log(this.id);
      const response = await fetch(`/users/comments/${this.id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let data = await response.json();
  
      this.comments = data;
      //return data;
    } catch (error) {
      console.error(error);
    }
  }

  async firstUpdated() {
    try {
      console.log(this.id);
      const response = await fetch(`/users/comments/${this.id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let data = await response.json();
  
      this.comments = data;
      //return data;
    } catch (error) {
      console.error(error);
    }
  }

  inputHandler(event) {
    console.log(event);
    const searchInput = this.shadowRoot.getElementById("inputComment");
    const searchTerm = searchInput.value.trim();
    const data = {
      comment: searchTerm,
      user: window.localStorage.getItem('username'),
      recipeId: this.id
    }
    console.log(data);
    fetch(`/users/comments/${this.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(res);
        this.fetchData();
        this.requestUpdate();
        this.#socket.emit("message", searchTerm);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    console.log('Render', this.comments)
    return html`
      <div id="comments">
        <h2>Comments</h2>
        <hr />
        <ul>
          ${this.comments.map(
            (com) => html`<li>
              <div>
                <div id="dataCom">
                  <h6 id="user">${com.user}</h6>
                  <p>${com.date}</p>
                </div>
                <p>${com.comment}</p>
              </div>
            </li>`
          )}
        </ul>
        <div id="addComment">
          <input
            placeholder="Type comment..."
            type="text"
            id="inputComment"
            name="comment"
          />
          <button @click=${this.inputHandler} type="button">Add Comment</button>
        </div>
      </div>
    `;
  }
}
customElements.define("comment-form", CommentSheme);
