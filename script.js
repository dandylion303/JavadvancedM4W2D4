const booksRow = document.getElementById('booksRow')
const search = document.getElementById('search')
const submitBtn = document.getElementById('submitBtn')
const modalBody = document.getElementById('modalBody')
const clearBtn = document.getElementById('clear')
const modalFooter = document.getElementById('modalFooter')

let allBooks = []
let cartBooks = []


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



//funzione che crea le card usando come parametri solo alcune parti dell'array
const createBookCard = ({ title, img, price, category, asin }) => {
    const col = document.createElement('div')
    col.classList.add('col-4', 'col-md-2', 'mb-5')

    const card = document.createElement('div')
    card.classList.add('card', 'h-100', 'text-center')
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

    const addToCartBtn = document.createElement('a')
    addToCartBtn.classList.add('btn', 'btn-success', 'd-block', 'link-underline-opacity-0', 'link-underline', 'my-1')
    addToCartBtn.innerText = "Add to Cart"
    cardBody.appendChild(addToCartBtn)
    addToCartBtn.addEventListener('click', () => addToCart({ title, img, price, category, asin }))

    const jumpButton = document.createElement('a')
    jumpButton.classList.add('btn', 'd-block', 'link-underline-opacity-0', 'link-underline', 'btn-secondary', 'my-1')
    jumpButton.innerText = "Remove"
    cardBody.appendChild(jumpButton)
    jumpButton.addEventListener('click', () => {
        col.remove()
    })

    const detailButton = document.createElement('a')
    detailButton.classList.add('btn', 'd-block', 'link-underline-opacity-0', 'link-underline', 'btn-primary')
    detailButton.setAttribute('target', '_blank')
    detailButton.innerText = "Dettagli"
    detailButton.href = `details.html?id=${asin}`
    cardBody.appendChild(detailButton)


    //TEMPORANEO DA LEVARE
    const removeButton = document.createElement('button')
    removeButton.classList.add('btn')
    removeButton.innerText = 'rimuovi'
    cardBody.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        cartBooks = cartBooks.filter(cartBook => cartBook.asin !== asin)
        displayCart()
    })

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


submitBtn.addEventListener('click', () => {
    const bookSearch = search.value.trim().toLowerCase()
    const bookFiltered = allBooks.filter(book => book.title.toLowerCase().includes(bookSearch))
    displayBooks(bookFiltered)
})

const addToCart = (book) => {
    const cartBook = cartBooks.find(cartbook => cartbook.asin === book.asin)
    if (cartBook) {
        cartBook.quantity++;
    }
    else {
        cartBooks.push({ ...book, quantity: 1 })
    }
    displayCart()
}


//GESTIONE DEL MODALE CARRELLO
const displayCart = () => {
    modalBody.innerHTML = ''

    if (cartBooks.length === 0) {
        modalBody.innerHTML = "non c'è nulla qui"
        clearBtn.classList.toggle('d-none')
    }

    else {
        cartBooks.forEach(book => {
            const cartItem = document.createElement('div')
            cartItem.classList.add('d-flex', 'align-items-center', 'justify-content-between','mb-2')

            const thumbCover = document.createElement('img')
            thumbCover.src = book.img
            thumbCover.alt = book.title
            thumbCover.classList.add('rounded', 'me-3', 'thumbCover')

            const bookTitle = document.createElement('small')
            bookTitle.classList.add('thumbTitle')
            bookTitle.innerText = book.title

            const bookPrice = document.createElement('small')
            bookPrice.classList.add('thumbPrice')
            bookPrice.innerText = `${book.price}€ x ${book.quantity}`

            cartItem.append(thumbCover, bookTitle, bookPrice)
            modalBody.append(cartItem)


        })
    }

    const pricesOfItemsInCart = cartBooks.map(cartBook => cartBook.price*cartBook.quantity)
    let totalCartValue = pricesOfItemsInCart.reduce((total, price) => {
        return total + price
    })
    modalFooter.innerText= totalCartValue

}





clearBtn.addEventListener('click', () => {
    cartBooks = []
    displayCart()
})




