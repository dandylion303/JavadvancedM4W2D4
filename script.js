//1- Fetch endpoint to retrieve books
//2- Cycle through books to get book
//3- Make Cards with books and buttons (add to cart + liked)
//4- Add EventListener on click to save to cart || liked
//5- When book added to cart -> Make it known on card
//6- Functioning Search bar after 3 char typed
//7- Cart section
//8- Liked section

async function getBooks(){
    try{
       const result = await fetch('https://striveschool-api.herokuapp.com/books')
       const data = await result.json()
       console.log(data)
    }
    catch(error){
        console.log(error)
    }
}
getBooks()


/* 
function displayBooks(books){
    const booksCard = books.map(book=> return){
        
    }
} 
*/

/*    
 function listBooks(books){
    for(book of books){
    const card = booksCard(books)
        }
    } 
*/

/* 
function listBooks(books){
    books.forEach(book =>{
        const card = booksCard(book)
    })
}
 */


/* {<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Book title</h5>
    <p class="card-text">price</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">category</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Add to cart</a>
    <a href="#" class="card-link">Favourites</a>
  </div>
</div>} */



function createBookCard = (book) =>{
const col=
}