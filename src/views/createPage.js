import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../api/data.js";

let context = null;
export function createPageView(ctx) {
    context = ctx
    ctx.render(createViewTemplate(onSubmit));
}

function createViewTemplate(onSubmit) {
    return html` 
    <section class="createPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Add Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" placeholder="Album name">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" placeholder="Price">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text"
                            placeholder="Release date">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" placeholder="Description"></textarea>

                        <button class="add-album" type="submit">Add New Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`
}

async function onSubmit(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description
    } = Object.fromEntries(dataForm);

    try {
        if (!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description) {
            throw new Error("all fields must be filled")
        }

        await create(name, imgUrl, price, releaseDate, artist, genre, description);
        context.page.redirect("/");

    } catch (error) {
        alert(error.message)
    }
}