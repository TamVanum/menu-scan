

const precios=[1000, 4000, 2000];


var suma = precios.reduce(function(acumulador , valor){
    return acumulador + valor;
},0);

console.log(suma);