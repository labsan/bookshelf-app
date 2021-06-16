const STORAGE_KEY = "BOOKSHELF_APP"; 

let books = []; 

function isStorageExist() /* boolean */ {
	if (typeof Storage === undefined) {
		alert("Browser tidak mendukung local storage");
		return false;
	}
	return true;
}

function saveData() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(serializedData);

	if (data !== null) books = data;

	document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
	if (isStorageExist()) saveData();
}

function composeTodoObject(title, author, year, isComplete) {
	return {
		id: +new Date(),
		title,
		author,
        year,
		isComplete,
	};
}

function findBook(bukuId) {
	for (book of books) {
		if (book.id === bukuId) return book;
	}
	return null;
}

function findBookIndex(bukuId) {
	let index = 0;
	for (book of books) {
		if (book.id === bukuId) return index;

		index++;
	}

	return -1;
}

function refreshDataFromTodos() {
	const listUncompleted = document.getElementById(LIST_BOOK_UNCOMPLETED);
	let listCompleted = document.getElementById(LIST_BOOK_COMPLETED);

	for (book of books) {
		const newBook = makeLogBook(book.title, book.author, book.year,book.isComplete);
		newBook[ID_BUKU] = book.id;

		if (book.isComplete) {
			listCompleted.append(newBook);
		} else {
			listUncompleted.append(newBook);
		}
	}
}
