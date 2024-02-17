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
      width: 70%;
      height: 80%;
      background-color: orange;
      padding: 2rem;
      margin: 0.5rem;
      margin-left:11rem;
    }

    #comments ul {
      list-style: none;
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
    #comments ul li {
      background-color:white;
      padding:5px;
      width:90%;
      border-radius:10px;
      margin:1px;
    }
    #addComment {
      display:flex;
      width: 100%;
      justify-content:center;
    }
    #inputComment {
      width: 85%;
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
    this.#socket = io();
    this.#socket.on("comment", (updatedData) => {
      console.log('Received message:', updatedData);
      this.comments = updatedData;
      this.requestUpdate();
    });
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

        //searchInput.value="";
        if (searchTerm !== "") {
          this.#socket.emit("comment", searchTerm);
          this.shadowRoot.getElementById("inputComment").value = ""; // Clear input field
        }
        this.firstUpdated();
        this.requestUpdate();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return html`
      <div id="comments">
        <h2>Comments</h2>
        <hr />
        <ul>
          ${this.comments.map(
            (com) => html`<li>
              <div>
                <div id="dataCom">
                  <h4 id="user">${com.user}</h4>
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
