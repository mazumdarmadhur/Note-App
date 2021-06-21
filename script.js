// Displaying saved notes in a Browser.
showNotes();

// Submitting values in a Note.
let addBtn = document.getElementById('addBtn');

// Adding Values in a local Storage.
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addTxt");

    // Adding Date in the Local Storage.
    let noteDate = new Date();
    let a = noteDate.toLocaleString('default', {
        month: 'long'
    });
    let b = noteDate.getDate();
    let c = noteDate.getFullYear();

    let totalDate = b + ' ' + a + ' , ' + c;
    // console.log(totalDate);


    let notes = localStorage.getItem("notes");

    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value,
        dateNote: totalDate
    }

    noteObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addText.value = "";
    addTitle.value = "";
    // console.log(noteObj);
    showNotes();
})

// Showing Values in a NOTE.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `  
        <div class="col-lg-4 col-md-6 col-sm-4 single-note-item">
                <div class="noteCard card card-body card-color-1">
                <div class="note-info d-flex flex-row">
                    <h4 class="card-title"> ${element.title}
                    </h4>
                    <div class="ml-auto ">
                        <div id="${index}" onclick="deleteNote(this.id)" class="remove-note"></div>
                    </div>
                </div>
                <p class="card-text">${element.text}</p>
                <div class="d-flex flex-row dateArea">
                    <p class="note-date">${element.dateNote}
                        <div class=" ml-auto notes-icons">
                            <div class="edit-note"> </div>

                        </div>
                    </p>
                </div>
            </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (noteObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<div class="noNotes h1">
        There is no notes found.
    </div>`;
    }
}

// Deleting Note.
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    showNotes();
}


// Searching Notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTittle = element.getElementsByTagName("h4")[0].innerText.toLowerCase();

        if (cardTxt.includes(inputVal) || cardTittle.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})