const addBtn = document.querySelector(".add-btn");
const mainContainer = document.querySelector(".contents-container");
// const newEl = document.createTextNode();
const popupEl = document.querySelector(".input-popup");
const inputEl = document.querySelector(".text-input");

const cancel  = document.getElementById("cancel");
const save = document.getElementById("save");
const startText = document.querySelector(".start-text");
const editEl = document.querySelectorAll(".edit");
const deleteEl = document.querySelectorAll(".delete");
 

addBtn.addEventListener('click', function(){
    inputEl.value = "";
    popupEl.classList.remove("hidden")

})

save.addEventListener('click', function(){
    
    const text = inputEl.value;
    console.log(text);
    popupEl.classList.add("hidden");
    const html = ` 
    <div class="each-container">
        <div class="inner-container">
        <p class="text">
            ${text}
        </p>
        <div class="icons">
            <span class="edit-icon edit"
            ><i class="fas fa-pencil-alt"></i
            ></span>
            <span class="edit-icon delete"><i class="fas fa-trash"></i></span>
        </div>
        </div>
    </div>`;
    
    if(text == "") return;
    startText.classList.add('hidden')
    mainContainer.insertAdjacentHTML("afterbegin", html);
    
})

cancel.addEventListener('click', function(){

    inputEl.textContent = ""
    popupEl.classList.add("hidden");
})


editEl.forEach(edit => {
    console.log(edit);
    edit.addEventListener('click', function(){
        console.log('clicked edit');
    })


});
deleteEl.forEach(dele => {
console.log(dele);
    dele.addEventListener('click', function(){
        console.log('clicked dele');
        const ele = e.target;
        console.log(e.target);
    })


});