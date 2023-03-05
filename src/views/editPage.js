import { html } from "../../node_modules/lit-html/lit-html.js";
import { editPet, petInfo } from "../api/data.js";

let context = null;
export async function editPageView(ctx) {
    context = ctx;
    const petId = ctx.params.id;
    const infoPet = await petInfo(petId);


    ctx.render(editViewTemplate(infoPet, onSubmit));

}

function editViewTemplate(infoPet, onSubmit) {
    return html`
    <section id="editPage">
    <form @submit = ${onSubmit} class="editForm">
        <img src="${infoPet.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${infoPet.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${infoPet.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${infoPet.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${infoPet.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${infoPet.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section> `
}

async function onSubmit(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const { name, breed, age, weight, image } = Object.fromEntries(dataForm);

    try {
        if (!name || !breed || !age || !weight || !image) {
            throw new Error("all fields must be filled")
        }
        const id = context.params.id
        
        await editPet(id, name, breed, age, weight, image);

        context.page.redirect("/detailsPage/" + id);

    } catch (error) {
        alert(error.message)
    }
}