import test from 'node:test'
import { strictEqual } from 'node:assert'

const preciosSeleccionados = [5000, 6000, 7000]

const sumar = function (acumulador, valorActual) {
  return acumulador + valorActual
}

const sumaTotal = preciosSeleccionados.reduce(sumar, 0)

test('La suma total de los valores es correcta', () => {
  strictEqual(sumaTotal, 18000)
})

test('La suma total de los valores es correcta', () => {
  strictEqual(sumaTotal, 18000)
})
