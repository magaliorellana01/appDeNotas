const notasContainer = document.querySelector(".notas-container");
const botonCrear = document.querySelector(".btn");
let notas = document.querySelectorAll(".input-box");

function showNotas(){
    notasContainer.innerHTML = localStorage.getItem("notas");
}

showNotas();

function updateStorage(){
    localStorage.setItem("notas",notasContainer.innerHTML);
}

botonCrear.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "media/delete.png";
    notasContainer.appendChild(inputBox).appendChild(img);
})

notasContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "p"){
        notas = document.querySelector(".input-box");
        notas.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }

    document.addEventListener("keydown", event =>{
        if(event.key === "Enter"){
            document.execCommand("insertLineBreak");
            event.preventDefault();
        }
    })
})
