import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/data.js";

let context = null;
export function loginPageView(ctx) {
    context = ctx;
    ctx.render(loginViewTemplate(onSubmit));

}

function loginViewTemplate(onSubmit) {
    return html` 
    <section id="loginPage">
    <form @submit = ${onSubmit}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/registerPage">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`
}

async function onSubmit(e) {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.target));

    try {
        if (!email || !password) {
            throw new Error("all fields must be filled")
        }

        await login(email, password);

        context.page.redirect("/");

    } catch (error) {
        alert(error.message)
    }


}