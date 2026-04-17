const matchaURL = "https://striveschool-api.herokuapp.com/api/product/"
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQ2NjczOWY4NzAwMTU3YWIwODMiLCJpYXQiOjE3NzY0MDk5NTgsImV4cCI6MTc3NzYxOTU1OH0.-qJeuO-VKE8DlT11R-vB-C0jcfUgvSC2JsNHNeDvF2A"

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

console.log(id)
// fetch ONLY the one related to the id
fetch(matchaURL + id, {
  headers: {
    Authorization: myKey,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Error in fetching details")
    }
  })
  .then((details) => {
    console.log(details)
    getDetail(details)
  })
  .catch((error) => {
    console.log(`Details fetch error ${error}`)
  })

const getDetail = function (product) {
  const container = document.getElementById("detail-container")

  container.innerHTML = `
    <div class="row justify-content-center mt-5">
      <div class="col-md-8 col-lg-6">
        <div class="card matcha-card p-0 overflow-hidden">
          <!-- IMG -->
          <img src="${product.imageUrl}" class="card-img-top">
          <!-- BODY -->
          <div class="card-body d-flex flex-column p-4">
            <h2 class="card-title mb-2">${product.name}</h2>
            <p class="card-text mb-3">${product.description}</p>
            <div class="mb-3">
              <span class="text-muted">Brand</span>
              <h5 class="mb-0">${product.brand}</h5>
            </div>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="price fs-5">€${product.price}</span>
              <div class="d-flex gap-2">
                <button class="btn matcha-button" onclick="editProduct('${product._id}')">
                  Edit
                </button>
                <button class="btn matcha-button" onclick="deleteProduct('${product._id}')">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

//EDIT BUTTON TO ITEM BK PAGE LINK (edit version)
function editProduct(id) {
  window.location.href = `matcha-bk.html?id=${id}`
}

// DELETE BUTTON TO DELETE FUNCTION
function deleteProduct(id) {
  const confirmDelete = confirm(
    "Are you sure you want to eliminate this product?",
  )
// if not confirmed
  if (!confirmDelete) return
// if confirmed
  fetch(matchaURL + id, {
    method: "DELETE",
    headers: {
      Authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Deleted Product!")
        // return to homepage
        window.location.href = "index.html"
      } else {
        throw new Error("Item delete error")
      }
    })
    .catch((error) => {
      console.log(`Item delete ${error}`)
    })
}
