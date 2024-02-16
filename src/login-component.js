import { LitElement, html, css } from "lit";

class LoginForm extends LitElement {
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
      margin-bottom: 34px;
    }
    .login-form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .input-div {
      display: flex;
      align-items: center;
      width: 90%;
      height: 35px;
      margin-bottom: 20px;
    }

    .login-input {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      border: 1px solid #e8e7e7;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 8px;
    }
    .login-input:hover {
      border: 3px solid orange;
    }
    .fas {
      margin-right: 10px;
    }
    .checkbox {
      margin-top: 10px;
    }
    .checkbox span {
      margin-left: 4px;
      font-size: 15px;
    }
    #login-btn {
      width: 358px;
      height: 32px;
      background-color: orange;
      color: white;
      border-radius: 5px;
      border: 2px solid #cccccc;
    }
    #login-btn i {
      margin-right: 3px;
    }

    #login-btn:hover {
      border: 5px solid orange;
    }
    .login-btn {
      margin-top: 20px;
      text-align: center;
      margin-bottom: 20px;
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

  submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(res)

        localStorage.setItem("auth",data);
        window.dispatchEvent(
          new CustomEvent("vaadin-router-go", {
            detail: { pathname: "/users" },
          })
        );
        return res.json();
      })
      .catch((err) => {
        if (err.message === "Network response was not ok") {
          // Handle the error specifically related to res.ok being false
          alert("Invalid email or password");
        } else {
          // Handle other errors
          console.error(err);
        }
      });
  }

  render() {
    return html`
      <main>
        <header class="header">
          <img id="header-img" src="recipe_logo.jpg" alt="logo" />
        </header>
        <form class="login-form" @submit=${this.submitHandler.bind(this)}>
          <div class="input-div">
            <i class="fas fa-user" id="user"></i>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email:"
              class="login-input"
              required
            />
          </div>
          <div class="input-div">
            <i class="fas fa-key"></i>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password:"
              class="login-input"
              required
            />
          </div>
          <section class="newAccount-checkbox">
            <a href="/home" id="newAccount">You do not have an account? Create new one!</a>
            <a href="/register" id="newAccount"
              >You do not have an account? Create new one!</a
            >
            <div class="checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
          </section>
          <div class="login-btn">
            <button id="login-btn" type="submit" name="login">
              <i class="fas fa-sign-in-alt"></i>Login
            </button>
          </div>
        </form>
      </main>
    `;
  }

  submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(...formData.entries());
  }
}

customElements.define("login-form", LoginForm);
