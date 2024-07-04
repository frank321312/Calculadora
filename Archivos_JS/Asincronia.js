const calculadora = document.querySelector(".calculadora");
const resultado = document.querySelector(".resultado");

const fragmentCalculadora = document.createDocumentFragment();

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
        if (divAritmetica.textContent == "DEL") {
            let listResult = resultado.textContent.split("");
            listResult.pop();
            resultado.textContent = listResult.join("");
        } else if (divAritmetica.textContent == "=") {
            let listaResult = desestructurarString(resultado.textContent);
            let resultM = multiplicar(listaResult);
            let resultD = division(resultM);
            let resultS = suma(resultD);
            let resultR = resta(resultS);
            resultado.textContent = resultR[0];
        } else {
            resultado.innerHTML += divAritmetica.textContent;
        }
    });
}

calculadora.appendChild(fragmentCalculadora);

function desestructurarString(cadena) {
    let listaNumeros = [];
    let listaAritmetica = [];
    let listaNumArt = [];
    let concatenar = "";
    for (let i = 0; i < cadena.length; i++) {
        if (cadena[i] != "+" && cadena[i] != "-" && cadena[i] != "/" && cadena[i] != "*") {
            concatenar += cadena[i];
        } else {
            listaNumeros.push(concatenar);
            listaAritmetica.push(cadena[i]);
            concatenar = "";
        }
    }
    listaNumeros.push(concatenar);

    for (let i = 0; i < listaAritmetica.length; i++) {
        listaNumArt.push(listaNumeros[i]);
        listaNumArt.push(listaAritmetica[i]);
    }
    listaNumArt.push(listaNumeros[listaNumeros.length - 1]);

    return listaNumArt;
}

function multiplicar(lista) {
    let listMul = [];
    let resultado = 0;
    let num1 = 0;
    let num2 = 0;
    let listaNum = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == "*") {
            num1 = lista[i - 1];
            num2 = lista[i + 1];
            resultado = num1 * num2;
            // resultado = Number(num1) * Number(num2);
            listMul.push(resultado.toString());
            listaNum.push(num1, num2)
        } else {
            listMul.push(lista[i]);
        }
    }

    for (let i = 0; i < listaNum.length; i++) {
        listMul = remove(listMul, listaNum[i].toString());
    }

    return listMul;
}

function division(lista) {
    let listDiv = [];
    let resultado = 0;
    let num1 = 0;
    let num2 = 0;
    let listaNum = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == "/") {
            num1 = lista[i - 1];
            num2 = lista[i + 1];
            resultado = num1 / num2;
            listDiv.push(resultado.toString());
            listaNum.push(num1, num2)
        } else {
            listDiv.push(lista[i]);
        }
    }

    for (let i = 0; i < listaNum.length; i++) {
        listDiv = remove(listDiv, listaNum[i].toString());
    }

    return listDiv;
}

function suma(lista) {
    let listSum = [];
    let resultado = 0;
    let num1 = 0;
    let num2 = 0;
    let listaNum = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == "+") {
            num1 = Number(lista[i - 1]);
            num2 = Number(lista[i + 1]);
            resultado = num1 + num2;
            // resultado = Number(num1) * Number(num2);

            listSum.push(resultado.toString());
            listaNum.push(num1, num2)
        } else {
            listSum.push(lista[i]);
        }
    }

    for (let i = 0; i < listaNum.length; i++) {
        listSum = remove(listSum, listaNum[i].toString());
    }

    return listSum;
}

function resta(lista) {
    let listRes = [];
    let resultado = 0;
    let num1 = 0;
    let num2 = 0;
    let listaNum = [];
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == "-") {
            num1 = lista[i - 1];
            num2 = lista[i + 1];
            resultado = num1 - num2;
            listRes.push(resultado.toString());
            listaNum.push(num1, num2)
        } else {
            listRes.push(lista[i]);
        }
    }

    for (let i = 0; i < listaNum.length; i++) {
        listRes = remove(listRes, listaNum[i].toString());
    }

    return listRes;
}

function remove(lista, caracter) {
    let index = lista.indexOf(caracter);
    let inicio = [];
    let final = [];

    if (lista[0] == caracter) {
        return lista.slice(1);
    } else {
        inicio = lista.slice(0, index);
        final = lista.slice(index + 1);
    }

    return index == -1 ? lista : [...inicio, ...final];
}

// console.log(sumar(9,3,12,3,4,5,6,8,8,4,3,1,2));

let lista = ["123",
    "*",
    "23",
    "+",
    "12",
    "-",
    "32",
    "/",
    "10",
    "*",
    "5"
];

// let resultM = multiplicar(lista);
// console.log("Multiplicacion: ", resultM);
// let resultD = division(resultM);
// console.log("Division: ", resultD);
// let resultS = suma(resultD);
// console.log("Suma: ", resultS);
// let resultR = resta(resultS);
// console.log("Resta", resultR);


