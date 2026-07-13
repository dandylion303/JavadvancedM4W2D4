const booksRow = document.getElementById('booksRow')
const search = document.getElementById('search')
const submitBtn = document.getElementById('submitBtn')
let allBooks = []

const getBooks = async () => {
    try {
        const result = await fetch('https://striveschool-api.herokuapp.com/books')
        const data = await result.json()
        allBooks = data
        displayBooks(data)
    }

    catch (error) {
        console.error(error)
    }
}

getBooks()


/* {
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
  </div>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

} */

const createBookCard = ({ title, img, price, category }) => {
    const col = document.createElement('div')
    col.classList.add('col-4','col-md-2','mb-3')

    const card = document.createElement('div')
    card.classList.add('card', 'h-100','text-center')
    col.appendChild(card)

    const bookCover = document.createElement('img')
    bookCover.classList.add('card-img-top', 'h-100')
    bookCover.src = img
    bookCover.alt = title
    card.appendChild(bookCover)

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    card.appendChild(cardBody)

    const bookTitle = document.createElement('h5')
    bookTitle.classList.add('card-title')
    bookTitle.innerText = title
    cardBody.appendChild(bookTitle)

    const bookCategory = document.createElement('p')
    bookCategory.classList.add('card-text')
    bookCategory.innerText = category
    cardBody.appendChild(bookCategory)

    const bookPrice = document.createElement('p')
    bookPrice.classList.add('card-text')
    bookPrice.innerText = `${price}€`
    cardBody.appendChild(bookPrice)

    const addToCart = document.createElement('a')
    addToCart.classList.add('card-link','d-block','link-underline-opacity-0','link-underline')
    addToCart.innerText = "Aggiungi al Carrello"
    cardBody.appendChild(addToCart)

    const jumpButton = document.createElement('a')
    jumpButton.classList.add('card-link','d-block','link-underline-opacity-0','link-underline')
    jumpButton.innerText = "Salta!"
    cardBody.appendChild(jumpButton)

    return col
}

/* const displayBooks = (books)=>{
    for(const book of books){
        const cardBook = createBookCard(book)

        booksRow.appendChild(cardBook)
    }

} */

const displayBooks = (books) => {
    booksRow.innerHTML = ''
    const cardBooks = books.map(book => createBookCard(book))
   // cardBook.forEach(card => booksRow.appendChild(card))
   booksRow.append(...cardBooks)

}


submitBtn.addEventListener('click',()=>{
    const bookSearch = search.value.trim().toLowerCase()
    const bookFiltered = allBooks.filter(book=>book.title.toLowerCase().includes(bookSearch))
    displayBooks(bookFiltered)
})