const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.put('/book/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  const index = books.findIndex(book => book.isbn === isbn);

    if (index !== -1) {
        books[index] = {...books[index], ...newBook};
        res.json(newBook);
        res.send('Book is edited');
    } else {
        res.status(404).send('Book not found');
    }
});

app.get('/book/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find(book => book.isbn === isbn);

  if (book) {
    res.json(book);
  }
  else {
    res.status(404).json({ error: 'Book not found'});
  }
});

app.delete('/book/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  console.log("isbn:", {isbn})

  const initialLength = books.length; 

  books = books.filter(book => book.isbn !== isbn); 

  if (books.length === initialLength - 1) {
    res.send('Book is deleted'); 
  } else {
    res.status(404).send('Book not found'); 
  }
});

app.listen(port, () => console.log('Hello world app listening on port 3000'));
