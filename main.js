const calculadora = document.querySelector(".calculadora");
const numeros = document.querySelector(".numeros");
const inputOutput = document.querySelector(".input-output");

const numerosOperaciones = [9, 8, 7, "DEL", "AC", 6, 5, 4, "/", "x", 3, 2, 1, "+", "-", 0, "(", ")", ".", "="];

for (let i = 0; i < numerosOperaciones.length; i++) {
    const numero = document.createElement("div");
    numero.classList.add("numero");
    numero.textContent = numerosOperaciones[i];
    numeros.appendChild(numero);
}

const numeroAll = document.querySelectorAll(".numero");

// result= ["2", "x"] 

// result = ["(", "3", "-", "1", "x"]

// result = ["(", "1", "+", "1", ")"]

// result =  ["(", "3", "-", "1", "x", ["(", "1", "+", "1", ")"], ")"]

// result = ["2", "x", ["(", "3", "-", "1", "x", ["(", "1", "+", "1", ")"], ")"]]
const myCadena = "-2.72x(+3-1x(1+1))";

const operaciones = ["+", "-", "x", "/"]
const noEmpezarCon = ["x", "/", "."]

function validarFormato(cadena) {
    if (noEmpezarCon.includes(cadena[0]) || operaciones.includes(cadena[cadena.length - 1]) || cadena[cadena.length - 1] == ".") {
        return true;
    }
}

function esNegativo(result) {
    if (result[0] == "-" || result[0] == "+") {
        let operacion = result.shift();
        result[0] = operacion + result[0];
    }
    return result;
}

function convertirCadenaLista(cadena) {
    let result = [];
    let stringNumber = "";
    let historial = [];
    let contador = 0;
    let countInital = 0;
    let countFinal = 0;

    if (validarFormato(cadena)) {
        return false
    }

    for (let i = 0; i < cadena.length; i++) {
        const char = cadena[i];
        
        if (char == "(") {
            contador = 0;
            countInital++;
            let subExpresion = ["("];
            historial.push(result);
            result = subExpresion
        } else if (char == ")") {
            countFinal++;

            if (stringNumber) {
                result.push(stringNumber);
                stringNumber = "";
            }
            
            let validarCadena = [...result];
            validarCadena.shift();
            if (validarFormato(validarCadena.join(""))) {
                return false;
            }
            
            result.shift();
            result = esNegativo(result);
            result.unshift("(");

            result.push(")")
            let subExpresion = result;
            result = historial.pop();
            result.push(subExpresion);
        } else if (operaciones.includes(char)) {
            contador++;

            if (stringNumber.match(/\./g) != null && stringNumber.match(/\./g).length > 1) {
                return false;
            }

            if (stringNumber) {
                result.push(stringNumber);
                stringNumber = "";
            }

            if (char != " ") {
                result.push(char);
            }
        } else if (!isNaN(Number(char)) || char == ".") {
            stringNumber += char;
            contador = 0;
        } else {
            return false;
        }

        if (contador == 2) {
            return false
        }
    }

    if (countInital != countFinal) {
        return false;
    }

    result = esNegativo(result);

    if (stringNumber) {
        result.push(stringNumber);
    }

    return result;
}

// Reemplaza el numero anterior, posterior y la operacion a realizar ubicando a esta misma
// el resultado de la operacion se realiza fuera de la funcion, solo se debe pasar el resultado final
// para que se agregue en la nueva lista, ocupando el indice que ocupaban los anteriores elementos
function replace(lista, operacion, newItem) {
    const index = lista.indexOf(operacion);
    const lista_uno = lista.slice(0, index - 1);
    const lista_dos = lista.slice(index + 2);
    return lista_uno.concat(newItem.toString(), lista_dos);
}

function calcularOperacion(lista, operacion) {
    let listaOperacion = lista;
    while (listaOperacion.includes(operacion)) {
        const index = listaOperacion.indexOf(operacion);
        const num_uno = Number(listaOperacion[index - 1]);
        const num_dos = Number(listaOperacion[index + 1]);
        let resultado = 0;

        if (operacion == "x") {
            resultado = num_uno * num_dos;
        } else if (operacion == "/") {
            resultado = num_uno / num_dos;
        } else if (operacion == "+") {
            resultado = num_uno + num_dos;
        } else {
            resultado = num_uno - num_dos;
        }
        listaOperacion = replace(listaOperacion, operacion, resultado);
    }

    return listaOperacion;
}

function buscarParentesis(lista, historial = []) {
    for (let i = 0; i < lista.length; i++) {
        // Si i es un array se asigna a la lista y termina el bucle
        if (Array.isArray(lista[i])) {
            lista = lista[i];
            historial.push(lista);
            break;
        }
    }

    // Si la lista tiene un parentesis ("(") se retorna la lista
    if (lista.join("").match(/\(/g) != null && lista.join("").match(/\(/g).length == 1) {
        return [lista, historial];
    }

    // Si la lista tiene mas de un parentesis se vuelve a llamar la funcion
    return buscarParentesis(lista, historial);
}

// const myList = ["2", "x", ["(", "2", "+", "1", "x", ["(", "1", "+", "9", "-", ["(", "3", "-", "5", ")"], ")"], ")"], "-", ["(", "6", "+", "5", ")"]];

function obtenerResultado(operacion) {
    const multiplicacion = calcularOperacion(operacion, "x");
    const division = calcularOperacion(multiplicacion, "/");
    const suma = calcularOperacion(division, "+");
    const resta = calcularOperacion(suma, "-");
    return resta;
}

function resolverParentesis(listOperacion) {
    let bool = false;
    let [operacion, historial] = buscarParentesis(listOperacion);
    let resultList = [];
    let count = 0;
    let countResult = 0;
    const resultado = obtenerResultado(operacion)
    while (historial.length > 1) {
        const element = historial[count];
        if (element.includes(historial[historial.length - 1])) {
            const index = element.indexOf(historial[historial.length - 1]);
            const list_uno = element.slice(0, index);
            const list_dos = element.slice(index + 1);
            if (countResult == 0) {
                const unirLista = [...list_uno, resultado[1], ...list_dos];
                resultList.push(unirLista);
                historial.pop();
                countResult++;
            } else {
                const unirLista = [...list_uno, resultList[resultList.length - 1], ...list_dos];
                resultList.push(unirLista);
                historial.pop();
            }
            count = 0
        } else {
            count++;
        }
    }

    const indexHistorial = listOperacion.indexOf(historial[0]);

    if (indexHistorial != -1) {
        const list_uno = listOperacion.slice(0, indexHistorial);
        const list_dos = listOperacion.slice(indexHistorial + 1);
        if (resultList.length != 0) {
            listOperacion = [...list_uno, resultList[resultList.length - 1], ...list_dos]
        } else {
            listOperacion = [...list_uno, resultado[1], ...list_dos]
        }
    }

    for (let i = 0; i < listOperacion.length; i++) {
        if (Array.isArray(listOperacion[i])) {
            bool = true;
            break;
        }
    }

    // Caso base: Si no hay más parentesis (Arrays) en listOperacion, se retorna el resultado de la operación
    if (!bool) {
        return listOperacion
    }

    // Caso secundario: Si hay mas parentesis (Arrays), se vuelve a llamar a la funcion de nuevo
    return resolverParentesis(listOperacion);
}

function mostrarResultado() {
    const listaInputOutput = convertirCadenaLista(inputOutput.textContent);
    console.log(listaInputOutput)
    let bool = false;
    let resultado;

    if (listaInputOutput == false) {
        inputOutput.textContent = "ERROR";
        return;
    }

    for (let i = 0; i < listaInputOutput.length; i++) {
        if (Array.isArray(listaInputOutput[i])) {
            bool = true;
        }
    }

    if (bool) {
        const resultadoParentesis = resolverParentesis(listaInputOutput)
        resultado = obtenerResultado(resultadoParentesis)
    } else {
        resultado = obtenerResultado(listaInputOutput)
    }

    inputOutput.textContent = resultado[0];
}

function borrar() {
    inputOutput.textContent = inputOutput.textContent.slice(0, -1);
}

let scrollValue = 280;

for (let i = 0; i < numeroAll.length; i++) {
    const elemento = numeroAll[i];
    const elementoText = elemento.textContent;

    if (elementoText == "DEL" || elementoText == "AC" || elementoText == "=") {
        elemento.classList.add("result-output");
    }

    elemento.addEventListener("click", () => {
        if (inputOutput.textContent == "ERROR") {
            inputOutput.textContent = "";
        }

        if (elementoText == "DEL") {
            borrar();
        } else if (elementoText == "AC") {
            inputOutput.textContent = "";
        } else if (elementoText == "=") {
            mostrarResultado();
        } else {
            inputOutput.textContent += elementoText;
            scrollValue += 20;
            inputOutput.scrollLeft = scrollValue;
        }
    });
}

window.addEventListener("keydown", (e) => {
    const key = e.key;
    const keySpecial = ["Backspace", "Enter", ".", "+", "-", "/", "x", "(", ")"];

    if (inputOutput.textContent == "ERROR") {
        inputOutput.textContent = "";
    }

    if (!isNaN(Number(key))) {
        inputOutput.textContent += key;
    } else if (key == keySpecial[0]) {
        borrar();
    } else if (key == keySpecial[1]) {
        mostrarResultado();
    } else if (keySpecial.includes(key)) {
        inputOutput.textContent += key;
    }
})

// Completar las siguientes tareas
/*
    1- Arreglar el problema de poner un numero negativo al inicio. Completo
    2- Permitir el ingreso de numeros decimales. Completo
    4- Permitir el ingreso de parentesis. Completado
    5- Deployar la aplicacion en un servidor. Incompleto
*/
