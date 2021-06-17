const LIST_BOOK_UNCOMPLETED = 'daftar-buku-uncompleted';
const LIST_BOOK_COMPLETED = 'daftar-buku-completed';
const ID_BUKU = 'bukuId';

function makeLogBook(title, author, year, isComplete) {
  const txt_title = document.createElement('h3');
  txt_title.innerHTML = '<span id="judul">' + title + '</span>';

  const txt_author = document.createElement('p');
  txt_author.classList.add('author');
  txt_author.innerHTML = author;

  const txt_year = document.createElement('p');
  txt_year.classList.add('year');
  txt_year.innerHTML = year;

  const txt_container = document.createElement('div');
  txt_container.classList.add('inner');
  txt_container.append(txt_title, txt_author, txt_year);

  const container = document.createElement('div');
  container.classList.add('item', 'shadows');
  container.append(txt_container);
  if (isComplete) {
    container.append(createUndoButton(), createTrashButton());
  } else {
    container.append(createCheckButton(), createTrashButton());
  }
  return container;
}

function addLogBook() {
  const completeBookList = document.getElementById(LIST_BOOK_COMPLETED);
  const uncompleteBookList = document.getElementById(LIST_BOOK_UNCOMPLETED);

  const val_title_buku = document.getElementById('title').value;
  const val_author_buku = document.getElementById('author').value;
  const val_year_buku = document.getElementById('year').value;
  const checkBox = document.getElementById('check');

  if (checkBox.checked == true) {
    const book = makeLogBook(
        val_title_buku,
        val_author_buku,
        val_year_buku,
        true,
    );

    const objek_buku = composeTodoObject(
        val_title_buku,
        val_author_buku,
        val_year_buku,
        true,
    );

    book[ID_BUKU] = objek_buku.id;
    books.push(objek_buku);

    completeBookList.append(book);
    updateDataToStorage();
  } 
  else {
    const book = makeLogBook(
        val_title_buku,
        val_author_buku,
        val_year_buku,
        false,
    );

    const objek_buku = composeTodoObject(
        val_title_buku,
        val_author_buku,
        val_year_buku,
        false,
    );

    book[ID_BUKU] = objek_buku.id;
    books.push(objek_buku);

    uncompleteBookList.append(book);
    updateDataToStorage();
  }
}

function createButton(buttonTypeClass, text, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.innerText = text;
  button.addEventListener('click', function(event) {
    eventListener(event);
  });
  return button;
}
function addBookToCompleted(bookElement) {
  const listCompleted = document.getElementById(LIST_BOOK_COMPLETED);

  const el_title_buku = bookElement.querySelector('.item > .inner > h3').innerText;
  const el_author_buku = bookElement.querySelector('.item > .inner > p.author').innerText;
  const el_year_buku = bookElement.querySelector('.item > .inner > p.year').innerText;

  const buku_baru = makeLogBook(el_title_buku, el_author_buku, el_year_buku, true);

  const buku = findBook(bookElement[ID_BUKU]);
  buku.isComplete = true;

  buku_baru[ID_BUKU] = buku.id;
  listCompleted.append(buku_baru);

  bookElement.remove();
  updateDataToStorage();
}

function undoBookToStillRead(bookElement) {
  const listUncompleted = document.getElementById(LIST_BOOK_UNCOMPLETED);

  const el_title_buku = bookElement.querySelector('.item > .inner > h3').innerText;
  const el_author_buku = bookElement.querySelector('.item > .inner > p.author').innerText;
  const el_year_buku = bookElement.querySelector('.item > .inner > p.year').innerText;

  const buku_baru = makeLogBook(el_title_buku, el_author_buku, el_year_buku, false);

  const buku = findBook(bookElement[ID_BUKU]);
  buku.isComplete = false;

  buku_baru[ID_BUKU] = buku.id;
  listUncompleted.append(buku_baru);

  bookElement.remove();
  updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
  const posisi_buku = findBookIndex(bookElement[ID_BUKU]);

  books.splice(posisi_buku, 1);

  bookElement.remove();
  updateDataToStorage();
}

function createCheckButton() {
  return createButton('btn-baca', 'Selesai Dibaca', function(event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton('btn-hapus', 'Hapus', function(event) {
    removeBookFromCompleted(event.target.parentElement);
  });
}

function createUndoButton() {
  return createButton('btn-baca', 'Belum selesai baca', function(event) {
    undoBookToStillRead(event.target.parentElement);
  });
}
