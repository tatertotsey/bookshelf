const plusBtn = document.getElementById("plus");
const form = document.getElementById("form");
const addBtn = document.getElementById("add");
const inputs = document.querySelectorAll("[data-input]");
const main = document.getElementsByClassName("main")[0];
const bookForm = document.getElementsByClassName("book-form")[0];

let myLibrary = [];

//when '+' is clicked, display form in the content grid
plusBtn.onclick = () => {
  bookForm.style.display = "flex";
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addClicked();
});

//when 'add' clicked, the form disappears
function addClicked() {
  bookForm.style.display = "none";
  let book = new Book(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value,
    inputs[3].value
  );
  inputToLibrary(book);
  resetInput();
  createCard(book);
}

//remove the input contents
function resetInput() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

//create cards to dipslay the input contents
function createCard(book) {
  const newCard = document.createElement("div");

  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  title.className = "title";
  author.className = "author";
  pages.className = "pages";
  read.className = "read";
  newCard.className = "book";

  main.insertBefore(newCard, main.secondChild);
  newCard.append(title, author, pages, read);

  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages;
  read.innerText = book.read;
}

//create constructor for bookshelf
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//add the inputs that are taken from user to 'myLibrary'
function inputToLibrary(book) {
  myLibrary.push(book);
  updateStorageLibrary();
}

function displayBooks() {
  let myStorageLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  myStorageLibrary.forEach((storedBook) => {
    createCard(storedBook);
  });
}

function updateStorageLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  console.log(localStorage.getItem("myLibrary"));
}

displayBooks();

/* TODO: add with 'minus' removing books, maybe with vibration animation
         make searchbar works in the site
         make the pages accept only digits
         add some kind of 'remove all' button and functionality 
            if it is enabled make sure remove everything also from the localStorage
         maybe login option, Firebase? -UNNECESSARY
         add github logo to end of the _sidebar
         add favicon to the site url
         style the cards a bit better
         change color palette maybe?
*/
