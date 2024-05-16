async function loadBooks() {
  let response = await fetch("http://localhost:3000/books");

  console.log(response.status);
  console.log(response.statusText);

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const books = JSON.parse(data);

    for (let book of books) {
      console.log("Number of pages:", book.numOfPages);
      const x = `
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

              <div>Author: ${book.author}</div>
              <div>Publisher: ${book.publisher}</div>
              <div>Number Of Pages: ${book.numOfPages}</div>

              <hr>

              <button type="button" class="btn btn-danger" onclick="deleteBook('${book.isbn}')">Delete</button>
              <button type="button" class="btn btn-primary" data-toggle="modal"
                data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                Edit
              </button>
            </div>
          </div>
        </div>
      `;
      if (document.getElementById('books').innerHTML === '') {
        document.getElementById('books').innerHTML = x;
      } else {
        document.getElementById('books').innerHTML += x;
      }
    }
  }
}

loadBooks();

async function setEditModal(isbn) {
  let response = await fetch(`http://localhost:3000/book/${isbn}`);

  console.log(response.status);
  console.log(response.statusText);
  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const book = JSON.parse(data);

    const {
      title,
      author,
      publisher,
      publish_date,
      numOfPages
    } = book;

    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    document.getElementById('editForm').addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(event.target);

      const newBook = {
        isbn: formData.get('isbn'),
        title: formData.get('title'),
        author: formData.get('author'),
        publish_date: formData.get('publish_date'),
        publisher: formData.get('publisher'),
        numOfPages: formData.get('numOfPages')
      };

      let isbn = newBook.isbn;

      let response = await fetch(`http://localhost:3000/book/${isbn}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      console.log(response.status);
      console.log(response.statusText);

      if (response.status === 200) {
        console.log('Book is edited');
        loadBooks();
        $('#editBookModal').modal('hide');
      } else {
        console.log('Failed to edit book');
      }
    });
  }
}

async function deleteBook(isbn) {
  let response = await fetch(`http://localhost:3000/book/${isbn}`, { method: 'DELETE' });

  console.log(response.status);
  console.log(response.statusText);

  if (response.status == 200) {
    console.log('Book deleted');
    const cardToRemove = document.querySelector(`[data-isbn="${isbn}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }
    //loadBooks();
  }
}
