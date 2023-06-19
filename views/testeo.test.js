var preciosSeleccionados = [5000, 6000, 7000];

var sumaTotal = preciosSeleccionados.reduce(function(acumulador, valorActual) {
    return acumulador + valorActual;
}, 0);

test('La suma total de los valores es correcta', () => {
    expect(sumaTotal).toBe(18000);
});

test('La suma total de los valores es correcta', () => {
    expect(sumaTotal).toBe(18000);
});









