const matchaURL = "https://striveschool-api.herokuapp.com/api/product/"

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const form = document.getElementById("product-form")
//  "listen" to form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault()

  const nameInput = document.getElementById("name")
  const descriptionInput = document.getElementById("description")
  const brandInput = document.getElementById("brand")
  const imageUrlInput = document.getElementById("imageUrl")
  const priceInput = document.getElementById("price")

// get the values from the form
  const name = nameInput.value
  const description = descriptionInput.value
  const brand = brandInput.value
  const imageUrl = imageUrlInput.value
  const price = priceInput.value

//   create a new product with those input values
  const newProduct = new Product(name, description, brand, imageUrl, price)

  console.log(newProduct)

//   send to the server (API)
  fetch(matchaURL, {
    // convert in JSON
    body: JSON.stringify(newProduct),
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQ2NjczOWY4NzAwMTU3YWIwODMiLCJpYXQiOjE3NzY0MDk5NTgsImV4cCI6MTc3NzYxOTU1OH0.-qJeuO-VKE8DlT11R-vB-C0jcfUgvSC2JsNHNeDvF2A",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Server has not accepted the product")
      }
    })
    .then((data) => {
      console.log(data)
      alert("Product created!")
      form.reset()
    })
    .catch((error) => {
      console.log(`Saving Error ${error}`)
    })
})
