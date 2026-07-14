const category = document.getElementById('bookCategory')
const cover = document.getElementById('bookImg')
const title = document.getElementById('bookTitle')
const asin = document.getElementById('bookAsin')
const price = document.getElementById('bookPrice')


const params = new URLSearchParams(location.search)
const id = params.get('id')
const apiUrl = `https://striveschool-api.herokuapp.com/books/${id}`

const getBook = async ()=>{
    try{
        const result = await fetch (apiUrl)
        const data = await result.json()
        cover.src = data.img
        title.innerText = data.title
        category.innerText = data.category
        price.innerText = `${data.price} €`

    }
    catch(e){
        console.log(e)
    }
}
getBook()