const matchaURL = "https://striveschool-api.herokuapp.com/api/product/"
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQ2NjczOWY4NzAwMTU3YWIwODMiLCJpYXQiOjE3NzY0MDk5NTgsImV4cCI6MTc3NzYxOTU1OH0.-qJeuO-VKE8DlT11R-vB-C0jcfUgvSC2JsNHNeDvF2A"

const getProducts = function () {
  fetch(matchaURL, {
    // method: 'GET'
    headers: {
      Authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Error in fetching the products")
      }
    })
    .then((products) => {
      // here I hide the spinner
      document.getElementById("matcha-spinner").classList.add("d-none")

      console.log(products)

      createProducts(products)
    })
    .catch((error) => {
      console.log(`Fetch error ${error}`)
    })
}

const createProducts = function (products) {
  const container = document.getElementById("card-container")

  container.innerHTML = ""

  products.forEach((product) => {
    const newCard = document.createElement("div")
    // give the col class directly to the div you are creating or you will have one empty div that breacks the bs grid
    newCard.classList.add("col-6", "col-md-4", "col-lg-3", "my-4")

    newCard.innerHTML = `
      <div class="card matcha-card h-100">
          <img src="${product.imageUrl}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price">€${product.price}</span>
              <button class="btn matcha-button" onclick="goToDetail('${product._id}')">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    container.appendChild(newCard)
  })
}

getProducts()

// CARD DETAILS BUTTON TO ITEM DETAIL PAGE LINK
const goToDetail = function (id) {
  window.location.href = `matcha-dets.html?id=${id}`
}

// from U2-W1-D5 fixed and interactive navbar
const navbar = document.querySelector(".index-nav")
const hero = document.querySelector(".hero")

window.addEventListener("scroll", () => {
  const heroBottom = hero.offsetHeight

  if (window.scrollY > heroBottom - 80) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})