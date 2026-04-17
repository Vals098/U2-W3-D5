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
    <div class="card matcha-card p-4">
      <img src="${product.imageUrl}" class="img-fluid mb-3">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <h4>${product.brand}</h4>
      <h3>€${product.price}</h3>
    </div>
    `
}
