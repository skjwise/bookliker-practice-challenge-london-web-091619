document.addEventListener("DOMContentLoaded", function() {
    console.log("Dom content loaded!")

    const booksURI = 'http://localhost:3000/books'

    function getBooks(){
        fetch(booksURI)
        .then( response => response.json())
        .then( books => bookList(books))
    }

    function bookList(books){
        for(let i = 0; i < books.length; i++)
        renderBooks(books[i])
    }

    function renderBooks(book){
        const list = document.querySelector("#list")

        const liTag = document.createElement('li')
        liTag.innerText = book.title
        liTag.addEventListener('click', e =>{
            showBook(book)
        })

        list.append(liTag)
    }

    function showBook(book){
        const showPanel = document.querySelector('#show-panel')
        showPanel.innerHTML = ""

        h2 = document.createElement('h2')
        h2.innerText = book.title
        img = document.createElement('img')
        img.src = book.img_url
        p = document.createElement('p')
        p.innerText = book.description 
        bUsers = document.createElement('ul')

        likeButton = document.createElement('button')
        likeButton.innerText = "Like!"
        likeButton.addEventListener('click', e =>{ 
            likeBook(e, book)
            .then(books => showBook(books))
        })

        unlikeButton = document.createElement('button')
        unlikeButton.innerText = "Unlike!"
        unlikeButton.addEventListener('click', e => {
            unlikeBook(e, book)
            // .then(books => showBook(books))
        })

        book.users.forEach(user => {
            newLi = document.createElement('li')
            newLi.innerText = user.username
            newLi.id = user.id
            bUsers.appendChild(newLi)
        }) 

        showPanel.appendChild(h2)
        showPanel.appendChild(img)
        showPanel.appendChild(p)
        showPanel.appendChild(bUsers)
        showPanel.appendChild(likeButton)
        showPanel.appendChild(unlikeButton)
    }

    function likeBook(e, book) {
        e.target.innerText = "You like this Book!"
        bUsers = book.users
        bUsers.push({"id":1, "username":"pouros"})
        patchUsers = {users : bUsers}

        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(patchUsers)
        }
        return fetch(`${booksURI}/${book.id}`, configObject)
        .then(function(response){
            return response.json()
        })
    }


    //I haven't completed this function yet!
    function unlikeBook(e){
        e.target.innerText = "You've Unliked!"
        bUsers.lastElementChild.remove()
    }


    getBooks();
});
