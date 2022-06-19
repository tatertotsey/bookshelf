//when '+' is clicked, display form in the content grid

const plusBtn = document.getElementById("plus");
const form = document.getElementById("form");
const addBtn = document.getElementById("add");
const inputs = document.querySelectorAll("input");

plusBtn.onclick = () => {
  form.style.display = "";
};

//when 'add' clicked, the form disappears
addBtn.onclick = (e) => {
  form.style.display = "none";
  inputDelete();
  e.preventDefault();
};

//remove the input contents
