// Array para almacenar las notas
let notas = [];


// Función para agregar una nueva nota
function agregarNota(titulo, contenido){
    const nuevaNota = {
        id: Date.now(),
        titulo,
        contenido,
        archivada: false,
    };
    notas.push(nuevaNota);
    mostrarNotas();
}

// Función para archivar/desarchivar una nota

function archivarNota(id){
    notas = notas.map((nota) => nota.id === id ? {...nota, archivada: !nota.archivada} : nota); 
    mostrarNotas();
}

// Función para mostrar las notas según el filtro

function mostrarNotas(filtro = "todas"){
    const contenedor = document.querySelector(".notas-container");
    contenedor.innerHTML = "";

    const notasFiltradas = notas.filter((nota) => {
        if(filtro === "activas") return !nota.archivada;
        if(filtro === "archivadas") return nota.archivada;
        return true;
    })

    if(notasFiltradas.length === 0){
        contenedor.innerHTML= "<p> No hay notas para mostrar <p/>";
        return;
    }

    notasFiltradas.forEach((nota) => {
        const notaDiv = document.createElement("div");
        notaDiv.classList.add("nota");
        notaDiv.innerHTML = ` 
            <h3>${nota.titulo}</h3>
            <p>${nota.contenido}</p>
            <button class="archivar-btn" data-id ="${nota.id}">
                ${nota.archivada ? "Desarchivar" : "Archivar"}
            </button>
        `;
        contenedor.appendChild(notaDiv);
    });

      // Asignar evento a los botones de archivar/desarchivar
    document.querySelectorAll(".archivar-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            archivarNota(id);
        });
    });



}


// Manejo del formulario

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.querySelector("#titulo").value.trim();
    const contenido = document.querySelector("#contenido").value.trim();

    if (titulo && contenido){
        agregarNota(titulo, contenido);
        document.querySelector("form").reset();
    }
    else {
        alert("por favor, complete todos los campos");
    }
});


// Filtros

document.querySelector(".ver-todas").addEventListener("click",() => mostrarNotas("todas"));
document.querySelector(".ver-activas").addEventListener("click",() => mostrarNotas("activas"));
document.querySelector(".ver-archivadas").addEventListener("click",() => mostrarNotas("archivadas"));

// Guardar notas en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

// Cargar notas desde localStorage
function cargarDesdeLocalStorage() {
    const notasGuardadas = localStorage.getItem("notas");
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        mostrarNotas(); // Mostrar las notas recuperadas
    }
}

// Modificar agregarNota para guardar en localStorage
function agregarNota(titulo, contenido) {
    const nuevaNota = {
        id: Date.now(),
        titulo,
        contenido,
        archivada: false,
    };
    notas.push(nuevaNota);
    guardarEnLocalStorage(); // Guardar al agregar
    mostrarNotas();
}

// Modificar archivarNota para guardar en localStorage
function archivarNota(id) {
    notas = notas.map((nota) =>
        nota.id === id ? { ...nota, archivada: !nota.archivada } : nota
    );
    guardarEnLocalStorage(); // Guardar al archivar
    mostrarNotas();
}

// Llamar a cargarDesdeLocalStorage al inicio
cargarDesdeLocalStorage();
