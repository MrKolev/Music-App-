import { html } from "../../node_modules/lit-html/lit-html.js";
import { delInfo, getInfoId } from "../api/data.js";
import { getUserData } from "../utils.js";

let context = null;
export async function detailsPageView(ctx) {
    context = ctx;
    const idDetail = ctx.params.id;
    const user = getUserData();

    const info = await getInfoId(idDetail)
    let isOwner = false;
    if (user) {
        if (info._ownerId === user._id) {
            isOwner = true;
        }
    }

    ctx.render(detailsViewTemplate(info, isOwner));
}

function detailsViewTemplate(info, isOwner) {
    return html` 
    <section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${info.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${info.name}</h1>
                <h3>Artist: ${info.artist}</h3>
                <h4>Genre: ${info.genre}</h4>
                <h4>Price: $${info.price}</h4>
                <h4>Date: ${info.releaseDate}</h4>
                <p>Description: ${info.description}</p>
            </div>

            ${isOwner ?
                html`
            <div class="actionBtn">
                <a href="/editPage/${info._id}" class="edit">Edit</a>
                <a @click=${()=>{
                    if (confirm("Are you sure you want to delete?")) {
                        delInfo(info._id);
                        context.page.redirect("/catalog");
                    }}} class="remove">Delete</a>
            </div>`
                : ""}
            
        </div>
    </div>
     `

}