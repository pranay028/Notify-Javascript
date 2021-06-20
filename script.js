const addBtn = document.querySelector(".add-btn");
const mainContainer = document.querySelector(".contents-container");
// const newEl = document.createTextNode();
const popupEl = document.querySelector(".input-popup");
const inputEl = document.querySelector(".text-input");

const cancelEl = document.querySelectorAll(".cancel");
const saveEl = document.querySelectorAll(".save");
const startText = document.querySelector(".start-text");
const editPop = document.querySelector(".edit-popup");

let editID;
let editElement;

// ? adding Popup screen funtionality------

addBtn.addEventListener("click", function () {
  inputEl.value = "";
  const saveBtn = popupEl.querySelector(".save");
  saveBtn.textContent = "Save";
  popupEl.classList.remove("hidden");
});

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
            <span class="edit-icon"
              ><i class="fas fa-pencil-alt edit"></i
            ></span>
            <span class="edit-icon"><i class="fas fa-trash delete"></i></span>
          </div>
        </div>`;

  element.innerHTML = html;

  if (!text) return;
  startText.classList.add("hidden");
  mainContainer.appendChild(element);
};

// ? Delete Funnction

const deleteFunc = (ele) => {
  mainContainer.removeChild(ele);
  if (mainContainer.childElementCount == 0) {
    startText.classList.remove("hidden");
  }
};

// ? Edit Function

const editFunc = (textElement, id) => {
  editPop.classList.remove("hidden");
  const edit_save = editPop.querySelector(".edit");
  const textEdit = editPop.querySelector(".edit-input");
  console.log(textEdit);
  editID = id;
  textEdit.value = textElement.textContent;
  textEdit.addEventListener("input", function () {
    textEdit.textContent = textEdit.value;
  });

  console.log(editID);
  console.log(textEdit.innerHTML);
  edit_save.addEventListener("click", function () {
    const getCont = document.getElementById(`${editID}`);
    console.log(getCont);

    const textEl = getCont.querySelector(".text");
    console.log(textEl);
    textEl.textContent = textEdit.innerHTML;

    textEl.textContent =
      textEl.textContent == " " || textEl.textContent == ""
        ? "Empty Note - Can Delete"
        : textEl.textContent;
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
  // if()

  save.addEventListener("click", addItem);
});

// ? main container Event Handlers-----------

mainContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  console.log(e.target);
  console.log(e.target.closest(".edit-icon"));
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
      console.log(contID);
      console.log(textEle);
      console.log(targetCont);
      editFunc(textEle, contID);
    }
  });
});
