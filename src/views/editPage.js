import { html } from "../../node_modules/lit-html/lit-html.js";
import { editId, getInfoId } from "../api/data.js";

let context = null;
export async function editPageView(ctx) {
    context = ctx;
    const idDetail = ctx.params.id;
    const info = await getInfoId(idDetail);


    ctx.render(editViewTemplate(info, onSubmit));

}

function editViewTemplate(info, onSubmit) {
    return html`
    <section class="editPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value="${info.name}">

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${info.imgUrl}">

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value="${info.price}">

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text"
                            value="${info.releaseDate}">

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value="${info.artist}">

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value="${info.genre}">

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${info.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
    `
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
        const id = context.params.id
        
        await editId(id, name, imgUrl, price, releaseDate, artist, genre, description );

        context.page.redirect("/detailsPage/" + id);

    } catch (error) {
        alert(error.message)
    }
}