function Book() {
  this.title = "The Hobbit";
  this.author = "J.R.R Tolkien";
  this.page = "259";
  this.read = "not yet";

  // this.info = function() {
  //    return this.title + ", written by " + this.author + ", has  " + this.page + " pages and " + this.read + " read.";
  // }
}

Book.prototype.info = function () {
  return (
    this.title +
    ", written by " +
    this.author +
    ", has  " +
    this.page +
    " pages and " +
    this.read +
    " read."
  );
};

const hobbit = new Book();
console.log(hobbit.info());
