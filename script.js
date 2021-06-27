const addBtn = document.querySelector(".add-btn");
const mainContainer = document.querySelector(".contents-container");
// const newEl = document.createTextNode();
const popupEl = document.querySelector(".input-popup");
const inputEl = document.querySelector(".text-input");

const cancelEl = document.querySelectorAll(".cancel");
const saveEl = document.querySelectorAll(".save");
const startText = document.querySelector(".start-text");
const editPop = document.querySelector(".edit-popup");
const actionText = document.querySelector(".action-text");
const editInput = document.querySelector(".edit-input");
// const textarea = document.querySelectorAll("textarea");

let editID;
let editElement;

document.addEventListener("DOMContentLoaded", getNotes);

// ? adding Popup screen funtionality------

addBtn.addEventListener("click", function () {
  inputEl.value = "";

  const saveBtn = popupEl.querySelector(".save");
  saveBtn.textContent = "Save";
  popupEl.classList.remove("hidden");
  inputEl.focus();
});

// ?   Action review text overlay

const actionFunc = function (actText) {
  actionText.classList.remove("hidden");
  actionText.innerHTML = `${actText}.`;

  setTimeout(function () {
    actionText.textContent = "";
    actionText.classList.add("hidden");
  }, 1500);
};

// ? Adding item ----------

const addItem = function () {
  const text = inputEl.value;

  // const text = inputEl.value;
  popupEl.removeAttribute("edit-id");
  // console.log(text);
  popupEl.classList.add("hidden");
  let currentID = new Date().getTime().toString();

  const element = document.createElement("div");
  element.classList.add("each-container");
  element.setAttribute("id", currentID);
  // console.log(element);
  const html = ` 
        <div class="inner-container">
          <p class="text">${text}</p>
          <div class="icons">
            <div class="edit-icon"
              ><i class="fas fa-pencil-alt edit"></i
            ></div>
            <div class="edit-icon"><i class="fas fa-trash delete"></i></div>
          </div>
        </div>`;

  element.innerHTML = html;

  if (!text) return actionFunc("Empty Value");
  startText.classList.add("hidden");
  mainContainer.appendChild(element);
  savelocalStorage(element);
  actionFunc("saved");
};

// ? Delete Funnction

const deleteFunc = (ele) => {
  const deleEle = ele.querySelector(".text").textContent;

  mainContainer.removeChild(ele);
  deleteStorage(deleEle);

  if (mainContainer.childElementCount == 0) {
    startText.classList.remove("hidden");
  }
  actionFunc("deleted");
};

// ? Edit Function

const editFunc = (textElement, id) => {
  editPop.classList.remove("hidden");
  editInput.focus();
  const edit_save = editPop.querySelector(".edit");
  const textEdit = editPop.querySelector(".edit-input");
  const cancel = editPop.querySelector(".cancel");

  // console.log(textEdit);
  editID = id;
  textEdit.value = textElement.textContent;
  const forStorageOld = textElement.textContent;
  textEdit.addEventListener("input", function () {
    textEdit.textContent = textEdit.value;
  });

  // console.log(editID);
  // console.log(textEdit.innerHTML);
  edit_save.addEventListener("click", function () {
    const getCont = document.getElementById(`${editID}`);
    // console.log(getCont);
    // console.log(editID);
    // console.log(getCont);
    // console.log(mainContainer);

    const textEl = getCont.querySelector(".text");

    textEl.textContent = textEdit.innerHTML;
    // console.log(textEl.textContent);

    // console.log(forStorageOld, textEl.textContent);

    textEl.textContent =
      textEl.textContent == " " || textEl.textContent == ""
        ? "Empty Note - Can Delete"
        : textEl.textContent;

    editStorage(forStorageOld, textEl.textContent);
    editPop.classList.add("hidden");
    actionFunc("edited");
  });
  cancel.addEventListener("click", function () {
    editPop.classList.add("hidden");
  });
};

//  ? cancel ------

cancelEl.forEach((cancel) => {
  cancel.addEventListener("click", function () {
    popupEl.classList.add("hidden");
  });
});

// ? Save -------

saveEl.forEach((save) => {
  save.addEventListener("click", addItem);
});

// ? main container Event Handlers-----------

mainContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  // console.log(e.target);
  // console.log(e.target.closest(".edit-icon"));
  if (e.target == mainContainer) return;
  const targetCont = e.target.closest(".each-container");
  const contID = targetCont.getAttribute("id");
  const textEle = targetCont.querySelector(".text");
  // console.log(textEle);
  // console.log(contID);-
  editEl = document.querySelectorAll(".edit");
  deleteEl = document.querySelectorAll(".delete");

  // ? Deleting container .--------
  deleteEl.forEach(function (dele) {
    if (e.target == dele || e.target == dele.closest(".edit-icon")) {
      deleteFunc(targetCont);
    }
  });

  // ?Editing container -----------
  editEl.forEach(function (edit) {
    if (e.target == edit || e.target == edit.closest(".edit-icon")) {
      // console.log(contID);
      // console.log(textEle);
      // console.log(targetCont);
      editFunc(textEle, contID);
    }
  });
});

const savelocalStorage = function (note) {
  // check do i have a previous array of items
  let notes = [];
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  const noteText = note.querySelector(".text");
  const noteValue = noteText.textContent;
  notes.push(noteValue);
  localStorage.setItem("notes", JSON.stringify(notes));
  // console.log(noteValue);
  // console.log(notes);
};

// let notes;
function getNotes() {
  let notes;
  let currentID = new Date().getTime().toString();

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }

  notes.forEach((note) => {
    const element = document.createElement("div");
    element.classList.add("each-container");
    element.setAttribute("id", currentID);
    // console.log(element);
    const html = ` 
        <div class="inner-container">
          <p class="text">${note}</p>
          <div class="icons">
            <div class = "linecut" > Edit </div>
            
            <div class="edit-icon"><i class="fas fa-trash delete"></i></div>
          </div>
        </div>`;

    element.innerHTML = html;

    startText.classList.add("hidden");
    mainContainer.appendChild(element);
    const editcutBtn = document.querySelectorAll(".linecut");

    editcutBtn.forEach((cutbtn) => {
      cutbtn.addEventListener("click", function () {
        actionFunc("Cannot edit note");
      });
    });
  });
}

const deleteStorage = function (note) {
  notes = JSON.parse(localStorage.getItem("notes"));
  // console.log(note);
  notes.splice(notes.indexOf(note), 1);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const editStorage = function (old, newText) {
  // console.log(old, newText);
  notes = JSON.parse(localStorage.getItem("notes"));
  const replaceValue = notes.indexOf(old);
  // console.log(replaceValue);
  notes[replaceValue] = newText;
  localStorage.setItem("notes", JSON.stringify(notes));
};
