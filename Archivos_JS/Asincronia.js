const calculadora = document.querySelector(".calculadora");
const resultado = document.querySelector(".resultado");

const fragmentCalculadora = document.createDocumentFragment();

function ResolverOperacion(...args) {

}

for (let index = 0; index < 13; index++) {
    const divNumber = document.createElement("div");
    const divAritmetica = document.createElement("div");
    divAritmetica.classList.add("aritmetica");
    divNumber.classList.add("numberContainer");
    divNumber.textContent = index;

    switch (index) {
        case 3: divAritmetica.textContent = "DEL";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 6: divAritmetica.textContent = "+";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 9: divAritmetica.textContent = "-";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 10: divAritmetica.textContent = "x";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 11: divAritmetica.textContent = "/";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        case 12: divAritmetica.textContent = "=";
                fragmentCalculadora.appendChild(divAritmetica);
                break;
        default: console.log("Error");
                break;
    }

    if (index < 10) {
        fragmentCalculadora.appendChild(divNumber);
    }

    divNumber.addEventListener("click", () => {
        resultado.innerHTML += divNumber.textContent; 
    });

    divAritmetica.addEventListener("click", () => {
        if (divAritmetica.textContent != "=" && divAritmetica.textContent != "DEL") {
            resultado.innerHTML += divAritmetica.textContent; 
        } else if (divAritmetica.textContent == "DEL") {
            let listResult = resultado.textContent.split("");
            listResult.pop()
            resultado.textContent = listResult.join("");
        } else if (divAritmetica.textContent == "=") {
            // ------------------------------------------------------------------- 
            // Desestructurar el contenido de la etiqueta span que es el resultado 
            // ------------------------------------------------------------------- 

            const listaAritmetica = ["+", "-", "/", "x"];
            let resultadoSpan = resultado.textContent.split("+").join(" ");

            for (let index = 0; index < listaAritmetica.length; index++) {
                resultadoSpan = resultadoSpan.split(`${listaAritmetica[index]}`).join(" ");
            }
            let resultadoFinalPrimero = resultadoSpan.split(" ");
            console.log(resultadoFinalPrimero);
            
            let listMate = resultado.textContent.split("1").join(" ");                
            for (let index = 0; index < 10; index++) {
                listMate = listMate.split(`${index}`).join(" ");
            }
            let resultadoFinalSegundo = listMate.trim().split(" ").join("").split("");
            console.log(resultadoFinalSegundo);
        }
    });
}

calculadora.appendChild(fragmentCalculadora);

// function sumar(...args) {
//     let resultado = 0;
//     let suma = resultado + args;
//     return suma;
// }

// console.log(sumar(1,2,3,4,5,6,7));