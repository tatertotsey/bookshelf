const plusBtn = document.getElementById("plus");
const form = document.getElementById("form");
const addBtn = document.getElementById("add");
const inputs = document.querySelectorAll("[data-input]");
const main = document.getElementsByClassName("main")[0];
const bookForm = document.getElementsByClassName("book-form")[0];
const removeAll = document.getElementById("removeAll");
const searchInput = document.getElementById("searchInput");
const remove = document.getElementById("remove");

let id = Math.max(0, JSON.parse(localStorage.getItem("lastID")));
let myLibrary = [];
let removeState = false;

//when '+' is clicked, display form in the content grid
plusBtn.onclick = () => {
  if (!removeState) {
    bookForm.style.display = "flex";
    taketoTop();
  }
};

//when the form submitted with 'add' button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBtnClicked();
});

//remove library and the storage when clicked
removeAll.onclick = () => {
  removeStorageLibrary();
};

//search through the site while searchInput is being filled in
searchInput.onkeyup = searchThrough;

//shake cards when '-' clicked
remove.addEventListener("click", () => {
  if (!removeState) {
    removeState = true;
    shakeMe();
  } else {
    removeState = false;
    shakeMe();
  }
});

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
  newCard.id = book.id;
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
  book.read ? (read.innerText = "read") : (read.innerText = "unread");

  newCard.onclick = changereadStatus;
}

//create constructor for bookshelf
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  id++;
  localStorage.setItem("lastID", JSON.stringify(id));
}

//add the inputs that are taken from user to 'myLibrary'
function inputToLibrary(book) {
  myLibrary.push(book);
  updateStorageLibrary();
}

//display books in the library
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

//remove all items in localStorage and from display
function removeStorageLibrary() {
  localStorage.clear();
  myLibrary = [];
  const storedbooks = document.getElementsByClassName("book");
  for (let i = storedbooks.length - 1; i >= 0; i--) {
    storedbooks[i].remove();
  }
}

function taketoTop() {
  main.scrollTo({ top: 0, behavior: "smooth" });
}

//for searchbar functionality
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

//vibrates books when - clicked
function shakeMe() {
  const bookList = document.getElementsByClassName("book");
  if (removeState) {
    for (const book of bookList) {
      const addimg = document.createElement("img");
      addimg.src = "res/red.png";
      addimg.className = "removebook";
      book.append(addimg);
      book.style.animation = "shake 1.5s";
      book.style.animationIterationCount = "infinite";
      addimg.onclick = removeUpdate;
    }
  }
  if (!removeState) {
    for (const book of bookList) {
      const addedimg = document.getElementsByClassName("removebook")[0];
      book.style.animation = "none";
      addedimg.remove();
    }
  }
}

//remove particular book from lib and localStorage
function removeUpdate(e) {
  myLibrary = myLibrary.filter((book) => book.id != e.target.parentNode.id);

  e.target.parentNode.remove();
  updateStorageLibrary();
}

function changereadStatus(e) {
  let readStat = e.target.children[3];
  if (readStat.innerText == "read") {
    readStat.innerHTML = "<p class='read'>unread</p>";
  } else if (readStat.innerText == "unread") {
    readStat.innerHTML = "<p class='read'>read</p>";
  }
  updateStorageFromCards(e);
}
function updateStorageFromCards(e) {
  for (book of myLibrary) {
    if (book.id == e.target.id) {
      book.read = !book.read;
      break;
    }
  }
  updateStorageLibrary();
}
