import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";

let context = null;

export function registerPageView(ctx) {
    context = ctx
    ctx.render(registerViewTemplate(onSubmit));

}

function registerViewTemplate(onSubmit) {
    return html`
    <section id="registerPage">
            <form @submit = ${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password"
                        placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/loginPage">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData);
    const repeatPassword = formData.get("conf-pass");

    try {
        if (!email || !password || !repeatPassword) {
            throw new Error("all fields must be filled")
        }

        if (password !== repeatPassword) {
            throw new Error("password and confirm password must match")
        }

        await register(email, password);

        context.page.redirect("/");

    } catch (error) {
        alert(error.message)
    }
}