const {create, all} = require('mathjs');

const config = {
    number: 'BigNumber',
    precision: 13
}

const math = create(all, config)

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
        data.push({key:iteration, iteration:iteration, x:math.round(xm,15).toString(), error:math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return data
}

export function calFalsePosition(init_fx, init_xl, init_xr, init_error){
    
    let fx = math.parse(init_fx).compile()
    let xl = math.bignumber(init_xl)
    let xr = math.bignumber(init_xr)
    let error = math.bignumber(init_error)
    let x = math.bignumber(0)
    let checkValue = math.multiply(fx.evaluate({x:x}), fx.evaluate({x:xr}))
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = 0
    let data = []
    let iteration = 1

    if (checkValue > 0) {
        xr = x
    }
    else if (checkValue < 0) {
        xl = x
    }

    while (math.larger(checkError, error)) {
        let fxl = fx.evaluate({x:xl})
        let fxr = fx.evaluate({x:xr})

        newX = math.divide(math.subtract(math.multiply(xl, fxr), math.multiply(xr, fxl)), math.subtract(fxr, fxl))
        
        checkValue = math.multiply(fx.evaluate({x:newX}), fxr)

        if(checkValue > 0){
            xr = newX
        }
        else if (checkValue < 0) {
            xl = newX
        }

        checkError = math.abs(math.divide(math.subtract(newX, x), newX))
        x = newX
        data.push({key:iteration, iteration:iteration, x:math.round(x,15).toString(), error:math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return data
}

export function calOnePoint(init_fx, init_x, init_error){
    let fx = math.parse(init_fx).compile()
    let x = math.bignumber(init_x)
    let error = math.bignumber(init_error)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = x
    let data = []
    let iteration = 1

    while (math.larger(checkError, error)) {

        newX = fx.evaluate({x:x})
        let newCheckError = math.abs(math.divide(math.subtract(newX, x), newX))
        if(iteration > 500 || (iteration > 5 && math.equal(checkError, 1))){
            data = []
            data.push({key:iteration, iteration:'ลู่ออก', x:'ลู่ออก', error:'ลู่ออก'})
            break;
        }
        checkError = newCheckError
        x = newX
        data.push({key:iteration, iteration:iteration, x:math.round(x,15).toString(), error:math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return data
}

export function calNewtonRaphson(initFx, initX, initError){

    let fx = math.parse(initFx).compile()
    let dfx = math.derivative(initFx,'x').compile()
    let x = math.bignumber(initX)
    let error = math.bignumber(initError)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX = x
    let data = []
    let iteration = 1

    while(math.larger(checkError, error)){

        newX = math.subtract(x, math.divide(fx.evaluate({x:x}), dfx.evaluate({x:x})))
        checkError = math.abs(math.divide(math.subtract(newX, x), newX))
        x = newX
        data.push({key:iteration, iteration:iteration, x:math.round(x,15).toString(), error:math.round(checkError,15).toString()})
        iteration = iteration + 1
    } 
    return data
}

export function calSecant(initFx, initX0, initX1, initError){
    let fx = math.parse(initFx).compile()
    let x0 = math.bignumber(initX0)
    let x1 = math.bignumber(initX1)
    let error = math.bignumber(initError)
    let checkError = math.bignumber(Number.MAX_VALUE)
    let newX
    let data = []
    let iteration = 1

    while(math.larger(checkError, error)){ 
        let  up = math.multiply(fx.evaluate({x:x1}), math.subtract(x1, x0))
        let down = math.subtract(fx.evaluate({x:x1}), fx.evaluate({x:x0}))
        newX = math.subtract(x1, math.divide(up, down))
        checkError = math.abs(math.divide(math.subtract(newX, x1), newX))
        x0 = x1
        x1 = newX
        data.push({key:iteration, iteration:iteration, x:math.round(newX,15).toString(), error:math.round(checkError,15).toString()})
        iteration = iteration + 1
    }
    return data
}

export function cloneArray(initArry){
    let Arr = initArry.map( x => [...x])
    return Arr
}

export function calCramerRule(n, initMatrixA, initMatrixB){

    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let detA = math.det(MatrixA)
    let x
    let data = []
    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            MatrixA[j][i] = MatrixB[j]
        }

        x = math.divide(math.det(MatrixA), detA)
        data.push({key:i+1, x:"x"+(i+1), value:x.toPrecision(10)})

        for(let j=0;j<n;j++){
            MatrixA[j][i] = math.bignumber(initMatrixA[j][i])
        }
    }
    return data
}

export function calGaussElimination(n, initMatrixA, initMatrixB){

    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let data = []
    let x = []
    for(let i=1;i<n;i++){

        for(let j=i;j<n;j++){

            let divide = MatrixA[i-1][i-1]
            let multi = MatrixA[j][i-1]

            for(let k =i-1;k<n;k++){
                MatrixA[j][k] = MatrixA[j][k] - ((MatrixA[i-1][k]/divide)*multi)
            }

            MatrixB[j] = MatrixB[j] - ((MatrixB[i-1]/divide)*multi)

        }
    }

    for(let i=0;i<n;i++){
        x.push(1)
    }

    for(let i=n-1;i>=0;i--){

        let sum = 0
        for(let j=0;j<n;j++){

            if(i!==j){
                sum = sum + (MatrixA[i][j]*x[j])
            } 

        }
        x[i] = (MatrixB[i]-sum)/MatrixA[i][i]
        data[i] = {key:i+1, x:"x"+(i+1), value:x[i].toPrecision(10)}
    }

    return data
}

export function calGaussJordan(n, initMatrixA, initMatrixB){
    
    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let x = []
    let data = []
    for(let i=1;i<n;i++){

        for(let j=i;j<n;j++){

            let divide = MatrixA[i-1][i-1]
            let multi = MatrixA[j][i-1]

            for(let k =i-1;k<n;k++){
                MatrixA[j][k] = MatrixA[j][k] - ((MatrixA[i-1][k]/divide)*multi)
            }

            MatrixB[j] = MatrixB[j] - ((MatrixB[i-1]/divide)*multi)

        }
    }

    for(let i=n-2;i>=0;i--){

        for(let j=i;j>=0;j--){

            let divide = MatrixA[i+1][i+1]
            let multi = MatrixA[j][i+1]

            for(let k =n-1;k>=i;k--){
                MatrixA[j][k] = MatrixA[j][k] - ((MatrixA[i+1][k]/divide)*multi)
            }

            MatrixB[j] = MatrixB[j] - ((MatrixB[i+1]/divide)*multi)

        }
    }

    for(let i=0;i<n;i++){
        x.push(MatrixB[i]/MatrixA[i][i])
        data.push({key:i+1, x:"x"+(i+1), value:x[i].toPrecision(10)})
    }

    return data
}

export function calLUDecomposition(n, initMatrixA, initMatrixB){
    
    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let MatrixL = []
    let MatrixU = []
    let x = []
    let y = []
    let data = []
    
    for(let i=0;i<n;i++){
        MatrixL.push([])
        MatrixU.push([])
        x.push(1)
        y.push(1)
        for(let j=0;j<n;j++){
            MatrixL[i][j] = 0
            if(i===j){
                MatrixU[i][j] = 1
            }
            else{
                MatrixU[i][j] = 0
            }
        }
    }

    for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
            let sum = 0
            for(let k=0;k<n;k++){
                if(k!==j || i<j){
                    sum = sum + (MatrixL[i][k]*MatrixU[k][j])
                }
            }
            if(i>=j){
                sum = MatrixA[i][j] - sum
                MatrixL[i][j] = sum
            }
            else{
                sum = MatrixA[i][j] - sum
                MatrixU[i][j] = sum/MatrixL[i][i]
            }
        }
    }

    for(let i=0;i<n;i++){
        let sum = 0
        for(let j=0;j<n;j++){
            if(i!==j){
                sum = sum + (MatrixL[i][j]*y[j])
            }
        }
        y[i] = ((MatrixB[i] - sum) / MatrixL[i][i])
    }

    for(let i=n-1;i>=0;i--){
        let sum = 0
        for(let j=0;j<n;j++){
            if(i!==j){
                sum = sum + (MatrixU[i][j]*x[j])
            }
        }
        x[i] = ((y[i] - sum) / MatrixU[i][i])
        data[i] = {key:i+1, x:"x"+(i+1), value:x[i].toPrecision(10)}
    }

    return data
}

export function calConjugate(n, initMatrixA, initMatrixB, initError){
    
    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = []
    let data = []
    let checkError = 9999999

    for(let i=0;i<n;i++){
        x.push(0)
    }

    let R = math.multiply(MatrixA, x)
    R = math.subtract(R, MatrixB)

    let D = math.multiply(R, -1)
    let lambda, alpha, temp

    while(checkError > error){

        lambda = math.transpose(D)
        temp = lambda
        lambda = math.multiply(lambda, R)
        temp = math.multiply(temp, MatrixA)
        temp = math.multiply(temp, D)

        lambda = lambda/temp
        lambda = math.multiply(lambda, -1)

        temp = math.multiply(lambda, D)
        x = math.add(x, temp)
        temp = math.multiply(MatrixA, x)
        R = math.subtract(temp, MatrixB)

        temp = math.transpose(R)
        temp = math.multiply(temp, R)

        checkError = math.sqrt(temp)
        alpha = math.transpose(R)
        alpha = math.multiply(alpha, MatrixA)
        alpha = math.multiply(alpha, D)

        temp = math.transpose(D)
        temp = math.multiply(temp, MatrixA)
        temp = math.multiply(temp, D)

        alpha = alpha/temp

        temp = math.multiply(alpha, D)
        D = math.multiply(R, -1)
        D = math.add(D, temp)

    }
    x.map((x, i) => data.push({key:i+1, x:"x"+(i+1), value:x.toPrecision(10)}))
    return data
}

export function calJacobi(n, initMatrixA, initMatrixB, initError){
    
    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = []
    let tmpX = []
    let data = []
    let checkError = true
    let iteration = 1

    for(let i=0;i<n;i++){
        x.push(1)
        tmpX.push(1)
    }

    while(checkError){

        if(iteration > 500){
            x.map((x, i) => data.push({key:i+1, x:"x"+(i+1), value:"ไม่สามารถหาค่าได้"}))
            return data
        }

        checkError = false

        for(let i=0;i<n;i++){

            let sum = 0
            for(let j=0;j<n;j++){
                if(i!==j){
                    sum = sum + MatrixA[i][j]*x[j]
                }
            }
            tmpX[i] = (MatrixB[i]-sum)/MatrixA[i][i]
            
            let tmpErr = Math.abs((tmpX[i]-x[i])/tmpX[i])
            if(tmpErr > error){
                checkError = true
            }
        }

        x = tmpX.map(x => x)
        iteration = iteration + 1
    }
    x.map((x, i) => data.push({key:i+1, x:"x"+(i+1), value:x.toPrecision(10)}))
    return data
}

export function calGaussSeidel(n, initMatrixA, initMatrixB, initError){
    
    let MatrixA = cloneArray(initMatrixA)
    let MatrixB = [...initMatrixB]
    let error = parseFloat(initError)
    let x = []
    let tmpX = null
    let data = []
    let checkError = true
    let iteration = 1

    for(let i=0;i<n;i++){
        x.push(1)
    }

    while(checkError){

        if(iteration > 500){
            x.map((x, i) => data.push({key:i+1, x:"x"+(i+1), value:"ไม่สามารถหาค่าได้"}))
            return data
        }

        checkError = false

        for(let i=0;i<n;i++){

            let sum = 0
            for(let j=0;j<n;j++){
                if(i!==j){
                    sum = sum + MatrixA[i][j]*x[j]
                }
            }
            tmpX = (MatrixB[i]-sum)/MatrixA[i][i]
            
            let tmpErr = Math.abs((tmpX-x[i])/tmpX)
            if(tmpErr > error){
                checkError = true
            }
            x[i] = tmpX
        }

        iteration = iteration + 1
    }
    x.map((x, i) => data.push({key:i+1, x:"x"+(i+1), value:x.toPrecision(10)}))
    return data
}

export function calNewtonDivide(matrix, x, selectedPoint){
    let n = selectedPoint.length
    let arr_x = []
    let arr_fx = [[]]
    selectedPoint.map(x => {
        arr_x.push(matrix[x][0])
        arr_fx[0].push(matrix[x][1])
    })

    for(let i=0;i<n-1;i++){
        let dynamic = []
        for(let j=0;j<n-i-1;j++){
            let value = math.bignumber(arr_fx[i][j+1])
            value = math.subtract(value,arr_fx[i][j])
            let temp = math.bignumber(arr_x[i+j+1])
            temp = math.subtract(temp,arr_x[j])
            value = math.divide(value,temp)
            dynamic.push(value)
        }
        arr_fx.push(dynamic)
    }
    let sum = math.bignumber(arr_fx[0][0]);
    let C = math.bignumber(1);
    for(let i=0;i<n-1;i++){
        let temp = math.bignumber(x)
        temp = math.subtract(temp,arr_x[i])
        C = math.multiply(C,temp)
        temp = math.multiply(C,arr_fx[i+1][0])
        sum = math.add(sum,temp)
    }
    return sum.toString()
}