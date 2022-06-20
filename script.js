const plusBtn = document.getElementById("plus");
const form = document.getElementById("form");
const addBtn = document.getElementById("add");
const inputs = document.querySelectorAll("[data-input]");
const main = document.getElementsByClassName("main")[0];
const bookForm = document.getElementsByClassName("book-form")[0];
const removeAll = document.getElementById("removeAll");
const searchInput = document.getElementById("searchInput");
const remove = document.getElementById("remove");

let myLibrary = [];

//when '+' is clicked, display form in the content grid
plusBtn.onclick = () => {
  bookForm.style.display = "flex";
  taketoTop();
};

//when the form submitted with 'add' button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBtnClicked();
});

//remove library and the storage when clicked
removeAll.onclick = removeStorageLibrary;

//search through the site while searchInput is being filled in
searchInput.onkeyup = searchThrough;

//shake cards when '-' clicked
remove.onclick = shakeMe;

//when 'add' clicked, the form disappears
function addBtnClicked() {
  bookForm.style.display = "none";
  let book = new Book(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value,
    inputs[3].checked
  );
  inputToLibrary(book);
  resetInput();
  createCard(book);
}

//remove the input contents
function resetInput() {
  form.reset();
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
  if (myStorageLibrary != null) {
    myStorageLibrary.forEach((storedBook) => {
      createCard(storedBook);
    });
  }
}

function updateStorageLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

loadStorageLibrary();
displayBooks();

function loadStorageLibrary() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary == null) {
    myLibrary = [];
  }
}

function removeStorageLibrary() {
  localStorage.clear();
  document.getElementsByClassName("book")[0].remove();
}

function taketoTop() {
  main.scrollTo({ top: 0, behavior: "smooth" });
}

function searchThrough(e) {
  const bookList = document.getElementsByClassName("book");
  const { value } = e.target;
  const searchQuery = value.toLowerCase();
  console.log("searching");
  for (const item of bookList) {
    let booktext = item.innerText.toLowerCase();
    if (!booktext.includes(searchQuery)) {
      item.style.display = "none";
    } else {
      item.style.display = "";
    }
  }
}

function shakeMe() {
  const bookList = document.getElementsByClassName("book");
  for (const book of bookList) {
    book.style.animation = "shake 1.5s";
    book.style.animationIterationCount = "infinite";
  }
}

/* TODO: add with 'minus' removing books

         maybe login option, Firebase? -UNNECESSARY

         style the cards a bit better
         change color palette maybe?

          - DONE! - make the pages accept only digits
          - DONE! - make sure that the form does not send invalid input
          - DONE! - if cards are too many, when 'plus' clicked take the user to the top!
          - DONE! - make tooltips for buttons on the sidebar
          - DONE! - add some kind of 'remove all' button and functionality 
                    if it is enabled make sure remove everything also from the localStorage

          - DONE! - make searchbar works in the site
          - DONE! - vibration animation 
          - DONE! - add github logo to end of the _sidebar
          - DONE! - add favicon to the site url

*/
