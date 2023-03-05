import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllcatalog } from "../api/data.js";


export async function catalogPageView(ctx) {
    ctx.render(catalogViewTemplate(await getAllcatalog()));

}

function catalogViewTemplate(data) {
    return html` <section id="catalog">
    <h2 class="catalog-title">Services for every animal</h2>
    <div class="animals-catalog">
${data.length > 0 ? data.map(x => {
    return html`
<div class="animals-board">
    <article class="service-img">
    <img class="animal-image-cover" src="${x.image}">
    </article>
    <h2 class="name">${x.name}</h2>
    <h3 class="breed">${x.breed}</h3>
    <div class="action">
<a class="btn" href="/detailsPage/${x._id}">Details</a>
</div>
</div>`})
: html`
<div>
<p class="no-pets">No pets in catalog</p>
</div>
</div>
</section>`
}
`
}