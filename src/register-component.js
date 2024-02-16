import { LitElement, html, css } from "lit";

class RegisterForm extends LitElement {
  static styles = css`
    main {
      position: fixed;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .header {
      text-align: center;
    }

    .error {
      background-color: #f2dede;
      color: #a94442;
      padding: 10px;
      width: 90%;
      border-radius: 5px;
      margin-top: 0;
    }

    #header-img {
      margin-top: 32px;
      height: 63px;
      margin-bottom: 20px;
    }

    .register-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .input-div {
      width: 90%;
      height: 35px;
      margin-bottom: 20px;
    }

    .registration-input {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 1px solid #e8e7e7;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 8px;
    }

    .registration-input:hover {
      border: 3px solid orange;
    }

    .register-btn {
      width: 80%;
      height: 30px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    #register-btn {
      width: 100%;
      height: 100%;
      background-color: #ffd580;
      color: white;
      border-radius: 5px;
      border: 2px solid #cccccc;
    }

    #register-btn:hover {
      background-color: orange;
    }

    @media (max-width: 800px) {
      main {
        width: 60%;
      }

      #header-img {
        width: 80%;
      }
    }

    @media (min-width: 800px) and (max-width: 1200px) {
      main {
        width: 40%;
      }
    }

    @media (min-width: 1200px) {
      main {
        width: 28%;
      }
    }
  `;

  render() {
    return html`
      <main class="main">
        <header class="header">
          <img id="header-img" src="logo.jpg" alt="logo">
        </header>
        <form class="register-form" @submit=${this.submitHandler.bind(this)}>
          <div class="input-div">
            <input
              id="name"
              type="text"
              name="username"
              placeholder="Username"
              class="registration-input"
            />
          </div>
          <div class="input-div">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              class="registration-input"
            />
          </div>
          <div class="input-div">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              class="registration-input"
            />
          </div>
          <div class="register-btn">
            <button id="register-btn" type="submit" name="signup">
              <i class="fas fa-sign-in-alt"></i>Register
            </button>
          </div>
        </form>
      </main>
    `;
  }

  submitHandler(event) {
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
    fetch("http://localhost:8080/users/register", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully fetched:", data);

        window.dispatchEvent(
          new CustomEvent("vaadin-router-go", { detail: { pathname: "/home" } })
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  }
}

customElements.define("register-form", RegisterForm);
