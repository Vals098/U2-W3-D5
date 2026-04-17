const matchaURL = "https://striveschool-api.herokuapp.com/api/product/"
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZGQ2NjczOWY4NzAwMTU3YWIwODMiLCJpYXQiOjE3NzY0MDk5NTgsImV4cCI6MTc3NzYxOTU1OH0.-qJeuO-VKE8DlT11R-vB-C0jcfUgvSC2JsNHNeDvF2A"
const params = new URLSearchParams(window.location.search)
const id = params.get("id")


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

  //  IF THE ID DOESN'T EXIST:
  // create a new one using the form (POST)
  let urlToUse
  if (id) {
      urlToUse = matchaURL + id
      //  IF THE ID EXISTS:
      // modify it (PUT)
  } else {
    urlToUse = matchaURL
  }

  fetch(urlToUse, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization: myKey,
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
    //   different alert message
      alert(id ? "Product updated!" : "Product created!")
      form.reset()
    })
    .catch((error) => {
      console.log(`Saving Error ${error}`)
    })
})


if (id) {
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
        throw new Error("Server has not accepted the product")
      }
    })
    .then((product) => {
      document.getElementById("name").value = product.name
      document.getElementById("description").value = product.description
      document.getElementById("brand").value = product.brand
      document.getElementById("imageUrl").value = product.imageUrl
      document.getElementById("price").value = product.price
    })
    .catch((error) => {
      console.log(`Saving Error ${error}`)
    })
}

const editProduct = (id) => {
  window.location.href = `matcha-bk.html?id=${id}`
}
