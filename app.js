import page from "./node_modules/page/page.mjs";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { loginPageView } from "./src/views/loginPage.js";
import { registerPageView } from "./src/views/registerPage.js";
import { catalogPageView } from "./src/views/catalog.js";
import { createPageView } from "./src/views/createPage.js";
import { editPageView } from "./src/views/editPage.js";
import { detailsPageView } from "./src/views/detailsPage.js";
import { homePageView } from "./src/views/homePage.js";
import { getUserData } from "./src/utils.js";
import { logout } from "./src/api/data.js";
import { searchPageView } from "./src/views/searchPage.js";

const content = document.getElementById("main-content");
const navBar = document.getElementById("header");

page("index", renderMiddleware, homePageView);
page("/", renderMiddleware, homePageView);
page("/catalog", renderMiddleware, catalogPageView);

page("/search", renderMiddleware, searchPageView);
page("/loginPage", renderMiddleware, loginPageView);
page("/registerPage", renderMiddleware, registerPageView);
page("/createPage", renderMiddleware, createPageView);
page("/logout", renderMiddleware, logoutBtn);

page("/editPage/:id", renderMiddleware, editPageView);
page("/detailsPage/:id", renderMiddleware, detailsPageView);

page.start();

upadeNav();


function logoutBtn() {
  logout();
  page.redirect("/");
}


function renderMiddleware(ctx, next) {
  ctx.render = (cont) => render(cont, content);
  ctx.page = page;
  next();
}

export function upadeNav() {
  const user = getUserData();

  render(html`
<header>
  <nav>
      <img src="./images/headphones.png">
      <a href="/">Home</a>
      <ul>
          <li><a href="/catalog">Catalog</a></li>
          <li><a href="/search">Search</a></li>
          ${user ?
      html`
            <li><a href="/createPage">Create Album</a></li>
            <li><a href="/logout">Logout</a></li>`
      :
      html`
            <li><a href="/loginPage">Login</a></li>
            <li><a href="/registerPage">Register</a></li>`
    }
      </ul>
  </nav>
</header>
`
    , navBar);

}
