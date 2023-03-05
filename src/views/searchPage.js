import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSearchInfo } from "../api/bonus.js";
import { getUserData } from "../utils.js";

let context = null;
export function searchPageView(ctx) {
    context = ctx;
    ctx.render(searchPageTemp())

}

function searchPageTemp(query, searchData, user) {
    return html`
    <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder=${query ? query : "Enter desired albums's name"}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

           ${searchData ? html`
           <div class="search-result">
                ${searchData.length > 0 ? html` 
                ${searchData.map(x => {
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
                }`
                : html`
                <p class="no-result">No result.</p>
                `}    
            </div>`
            : ""}
        </section>
    `
}

async function onSearch(e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    try {
        if (!query) {
            throw new Error("Field must be filled!")
        }
        const searchData = await getSearchInfo(query);
        const user = getUserData();
        context.render(searchPageTemp(query, searchData, user));

    } catch (error) {
        alert(error.message)
    }


}