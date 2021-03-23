const math = require('mathjs');

export function calBisection(init_fx, init_xl, init_xr, init_error) {

    let fx = math.parse(init_fx).compile()
    let xl = math.bignumber(init_xl)
    let xr = math.bignumber(init_xr)
    let error = math.bignumber(init_error)
    let xm = math.divide(math.add(xl, xr), 2)
    let checkValue = math.multiply(fx.evaluate({ x: xm }), fx.evaluate({ x: xr }))
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newXm = 0
    let data = []
    let iteration = 1

    if (checkValue > 0) {
        xr = xm
    }
    else if (checkValue < 0) {
        xl = xm
    }

    while (math.larger(checkError, error)) {
        newXm = math.divide(math.add(xl, xr), 2)
        checkValue = math.multiply(fx.evaluate({ x: newXm }), fx.evaluate({ x: xr }))
        if (checkValue > 0) {
            xr = newXm
        }
        else if (checkValue < 0) {
            xl = newXm
        }
        checkError = math.abs(math.divide(math.subtract(newXm, xm), newXm))
        xm = newXm
        data.push({key:iteration, iteration:iteration, x:xm.toString(), error:math.fix(checkError, 16).toString()})
        iteration = iteration + 1
    }
    return data
}