const cuadroAll = document.querySelectorAll(".cuadro");
const cuadroWin = document.querySelector(".cuadro__win");
const buttonReload = document.createElement("button");
const contenedorHijos = document.querySelector(".cotenedor__hijos");
const players = document.querySelectorAll(".player");

buttonReload.classList.add("reload");
buttonReload.textContent = "Volver a jugar";

let contador = 0;

let storageX = sessionStorage.getItem("JugadorX") == null ? sessionStorage.setItem("JugadorX", 0) : sessionStorage.getItem("JugadorX");
let storageO = sessionStorage.getItem("JugadorO") == null ? sessionStorage.setItem("JugadorO", 0) : sessionStorage.getItem("JugadorO");

players[0].textContent = `Jugador X: ${storageX}`;
players[1].textContent = `Jugador O: ${storageO}`;

function tieneHijos(agregarHijo, elemento) {
    if (elemento.children.length == 0) {
        elemento.appendChild(agregarHijo);
    }
}

function contieneEsaClase(elemento, clase) {
    return elemento.classList.contains(clase);
}   

function esGanador(listElement, num1, num2, num3, team) {
    return  contieneEsaClase(listElement[num1], team) && 
            contieneEsaClase(listElement[num2], team) && 
            contieneEsaClase(listElement[num3], team);
}

function ganaEquis(listElement) {
    return  esGanador(listElement, 0, 1, 2, "x") || esGanador(listElement, 3, 4, 5, "x") || esGanador(listElement, 6, 7, 8, "x") ||
            esGanador(listElement, 0, 4, 8, "x") || esGanador(listElement, 2, 4, 6, "x") || esGanador(listElement, 0, 3, 6, "x") ||
            esGanador(listElement, 1, 4, 7, "x") || esGanador(listElement, 2, 5, 8, "x");
}

function ganaO(listElement) {
    return esGanador(listElement, 0, 1, 2, "o") || esGanador(listElement, 3, 4, 5, "o") || esGanador(listElement, 6, 7, 8, "o") ||
        esGanador(listElement, 0, 4, 8, "o") || esGanador(listElement, 2, 4, 6, "o") || esGanador(listElement, 0, 3, 6, "o") ||
        esGanador(listElement, 1, 4, 7, "o") || esGanador(listElement, 2, 5, 8, "o");
}

function agregarAnimacion(lista, nombre) {
    for (let i = 0; i < lista.length; i++) {
        lista[i].style.animationName = nombre;
    }
}

for (let i = 0; i < cuadroAll.length; i++) {
    const x = document.createElement("div");
    x.classList.add("equis");

    const o = document.createElement("div");
    o.classList.add("circulo");

    cuadroAll[i].addEventListener("click", () => {
        
        if (!cuadroAll[i].classList.contains("contador")) {
            contador++
        }
        
        cuadroAll[i].classList.add("contador");
        
        console.log(contador);
        if (contador % 2 == 0) {
            tieneHijos(o, cuadroAll[i]);
            cuadroAll[i].classList.add("o");
        } else {
            tieneHijos(x, cuadroAll[i]);
            cuadroAll[i].classList.add("x");
        }
        console.log(ganaEquis(cuadroAll));
        if (ganaEquis(cuadroAll)) {
            contenedorHijos.innerHTML = `<span>Gano el jugador con "X"</span>`;
            contenedorHijos.appendChild(buttonReload);
            agregarAnimacion(cuadroAll, "desvanecerCuadro");
            cuadroWin.style.visibility = "visible";
            cuadroWin.style.animationName = "bajarCuadroWin";
            let valorX = Number(sessionStorage.getItem("JugadorX"));
            sessionStorage.setItem("JugadorX", valorX += 1);
            players[0].textContent = `Jugador X: ${sessionStorage.getItem("JugadorX")}`;
        } else if (ganaO(cuadroAll)) {
            contenedorHijos.innerHTML = `<span>Gano el jugador con "O"</span>`;
            contenedorHijos.appendChild(buttonReload);
            agregarAnimacion(cuadroAll, "desvanecerCuadro");
            cuadroWin.style.visibility = "visible";
            cuadroWin.style.animationName = "bajarCuadroWin";
            let valorO = Number(sessionStorage.getItem("JugadorO"));
            sessionStorage.setItem("JugadorO", valorO += 1);
            players[1].textContent = `Jugador O: ${sessionStorage.getItem("JugadorO")}`;
        }
    });

    buttonReload.addEventListener("click", () => {
        window.location.reload();
    });
}
