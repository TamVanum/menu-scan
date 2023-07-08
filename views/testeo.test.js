const test = require('node:test');
const { strictEqual } = require('node:assert');

const preciosSeleccionados = [5000, 6000, 7000];

const sumaTotal = preciosSeleccionados.reduce(function(acumulador, valorActual) {
    return acumulador + valorActual;
}, 0);

test('La suma total de los valores es correcta', () => {
    strictEqual(sumaTotal, 18000);
});

test('La suma total de los valores es correcta', () => {
    strictEqual(sumaTotal, 18000);
});









