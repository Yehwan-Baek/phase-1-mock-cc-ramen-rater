// write your code here
const url = "http://localhost:3000/ramens"

const divMenu = document.querySelector("#ramen-menu")

document.addEventListener("DOMContentLoaded", ()=>{
    displayRamens();
    addSubmitListener();
})

function displayRamens () {
    fetch(url)
    .then(res => res.json())
    .then(ramens => {
        ramens.forEach((ramen) => renderRamen(ramen))
        displayRamenDetails(ramens[0]);
    })
}

function addSubmitListener() {
    const ramenForm = document.getElementById("new-ramen")

    ramenForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewRamen();
        ramenForm.reset();
    })
}

function renderRamen(ramen) {
    let img = document.createElement("img")
    let ramenDiv = document.createElement("div")
    img.src = ramen.image;

    ramenDiv.appendChild(img)
    divMenu.appendChild(ramenDiv)

    img.addEventListener("click", () => displayRamenDetails(ramen));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.className = "delete-btn"
    ramenDiv.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", () => {deleteRamen(ramen.id, ramenDiv)})
}

function displayRamenDetails(ramen) {
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailRestaurant = document.getElementById("detail-restaurant");
    const detailRating = document.getElementById("detail-rating");
    const detailComment = document.getElementById("detail-comment");

    detailImage.src = ramen.image;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    detailRating.textContent = ramen.rating;
    detailComment.textContent = ramen.comment;
}

function addNewRamen() {
    const newName = document.getElementById("new-name").value;
    const newRestaurant = document.getElementById("new-restaurant").value;
    const newImage = document.getElementById("new-image").value;
    const newRating = document.getElementById("new-rating").value;
    const newComment = document.getElementById("new-comment").value;

    const newRamen = {
        "name": newName,
        "restaurant": newRestaurant,
        "image": newImage,
        "rating": newRating,
        "comment": newComment
    }

    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
    })

    renderRamen(newRamen);
    displayRamenDetails(newRamen);
}

function deleteRamen(id, ramenDiv) {
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    ramenDiv.remove();

    const placeholderInfo = {
        "name": "Click a ramen!",
        "restaurant": ":3",
        "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Wn3NuoGzrYA99hHdlJPyqgHaGH%26pid%3DApi&f=1&ipt=eed45238f4853904989af4839e855d4e6fe2094fd1b7640d14dd66bdb6a301da&ipo=images",
        "rating": "Select a ramen to display its rating!",
        "comment": "Same deal."
    }

    showRamenDetails(placeholderInfo);
}