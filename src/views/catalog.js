import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllcatalog } from "../api/data.js";
import { getUserData } from "../utils.js";


export async function catalogPageView(ctx) {
    const user = getUserData();
    ctx.render(catalogViewTemplate(await getAllcatalog(), user));

}

function catalogViewTemplate(data, user) {
    return html`
    <section id="catalogPage">
            <h1>All Albums</h1>
            ${data.length > 0 ? data.map(x => {
        return html`
                <div class="card-box">
                <img src="${x.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${x.name}</p>
                        <p class="artist">Artist: ${x.artist}</p>
                        <p class="genre">Genre: ${x.genre}</p>
                        <p class="price">Price: $${x.price}</p>
                        <p class="date">Release Date: ${x.releaseDate}</p>
                    </div>
                    ${user ? html`
                    <div class="btn-group">
                    <a href="/detailsPage/${x._id}" id="details">Details</a>
                </div>`
                : ""}
                </div>
            </div>`})
            : html`
            <p>No Albums in Catalog!</p>
            `}
    </section>`
}