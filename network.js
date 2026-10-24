class NeuralNetwork {
    static oneInput(data, nodes) {
        if (nodes == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfError").value == "MAE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MAE = 0;
                    let w1 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[1]

                        let a1 = (w1 * random_point[0]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * random_point[0]
                        let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * 1

                        w1 -= learning_rate * dcost_dw1;
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let y1 = data[i][1]

                                cost += Math.abs(y1 - (w1 * x1 + b1))
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let y1 = data[i][1]

                        MAE += Math.abs(y1 - (w1 * x1 + b1))

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MAE / data.length;

                    return [iterationsX, costY, [w1, b1]];

                } else if (document.getElementById("typeOfError").value == "MSE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MSE = 0;
                    let w1 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[1]

                        let a1 = (w1 * random_point[0]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = 2 * (yPred - target) * random_point[0]
                        let dcost_db1 = 2 * (yPred - target) * 1

                        w1 -= learning_rate * dcost_dw1;
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let y1 = data[i][1]

                                cost += (y1 - (w1 * x1 + b1)) ** 2
                            costY.push(cost/data.length);
                            }
                        }

                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let y1 = data[i][1]

                        MSE += (y1 - (w1 * x1 + b1)) ** 2

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MSE / data.length;

                    return [iterationsX, costY, [w1, b1]];
                }
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                alert(new Error);
            }
        } else if (nodes == "one") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let a2 = (w2 * a1) + b2
                            let yPred = a2

                            let cost = 0;

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w2 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w2 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += Math.abs(y1 - ((w1 * x1 + b1) * w2 + b2))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MAE += Math.abs(y1 - ((w1 * x1 + b1) * w2 + b2))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;

                        return [iterationsX, costY, [w1, w2, b1, b2]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let a2 = (w2 * a1) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w2 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * a1
                            let dcost_db1 = 2 * (yPred - target) * w2 * 1
                            let dcost_db2 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += (y1 - ((w1 * x1 + b1) * w2 + b2)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MSE += (y1 - ((w1 * x1 + b1) * w2 + b2)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;


                        return [iterationsX, costY, [w1, w2, b1, b2]];
                    }


                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * z1) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w2 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w2 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += Math.abs(y1 - (ReLU(w1 * x1 + b1) * w2 + b2))
                                costY.push(cost/data.length);
                                }
                            }

                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MAE += Math.abs(y1 - (ReLU(w1 * x1 + b1) * w2 + b2))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;

                        return [iterationsX, costY, [w1, w2, b1, b2]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * z1) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 =  2 * (yPred - target) * w2 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 =  2 * (yPred - target) * z1
                            let dcost_db1 =  2 * (yPred - target) * w2 * ReLUPrime(a1) * 1
                            let dcost_db2 =  2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += (y1 - (ReLU(w1 * x1 + b1) * w2 + b2)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MSE += (y1 - (ReLU(w1 * x1 + b1) * w2 + b2)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;

                        return [iterationsX, costY, [w1, w2, b1, b2]];
                    }
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * z1) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w2 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w2 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += Math.abs(y1 - (leakyReLU(w1 * x1 + b1) * w2 + b2))
                                costY.push(cost/data.length);
                                }
                            }

                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MAE += Math.abs(y1 - (leakyReLU(w1 * x1 + b1) * w2 + b2))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;

                        return [iterationsX, costY, [w1, w2, b1, b2]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * z1) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 =  2 * (yPred - target) * w2 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 =  2 * (yPred - target) * z1
                            let dcost_db1 =  2 * (yPred - target) * w2 * leakyReLUPrime(a1) * 1
                            let dcost_db2 =  2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    cost += (y1 - (leakyReLU(w1 * x1 + b1) * w2 + b2)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            MSE += (y1 - (leakyReLU(w1 * x1 + b1) * w2 + b2)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;

                        return [iterationsX, costY, [w1, w2, b1, b2]];
                    }                    
                }
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                alert(new Error);
            }
        } else if (nodes == "two") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let a2 = (w2 * random_point[0]) + b2
                            let a3  = (w3 * a1) + (w4 * a2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * a2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w4 * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let a2 = (w2 * x1) + b2
                                    let a3  = (w3 * a1) + (w4 * a2) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let a2 = (w2 * x1) + b2
                            let a3  = (w3 * a1) + (w4 * a2) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - (yPred))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;  
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let a2 = (w2 * random_point[0]) + b2
                            let a3  = (w3 * a1) + (w4 * a2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * a1
                            let dcost_dw4 = 2 * (yPred - target) * a2
                            let dcost_db1 = 2 * (yPred - target) * w3 * 1
                            let dcost_db2 = 2 * (yPred - target) * w4 * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;
                
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let a2 = (w2 * x1) + b2
                                    let a3  = (w3 * a1) + (w4 * a2) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let a2 = (w2 * x1) + b2
                            let a3  = (w3 * a1) + (w4 * a2) + b3
                            let yPred = a3

                            MSE += (y1 - (yPred)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;  
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];
                    }

                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * random_point[0]) + b2
                            let z2 = ReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (w2 * x1) + b2
                                    let z2 = ReLU(a2)
                                    let a3  = (w3 * z1) + (w4 * z2) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * x1) + b2
                            let z2 = ReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - (yPred))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;  
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * random_point[0]) + b2
                            let z2 = ReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * z1
                            let dcost_dw4 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w4 * ReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (w2 * x1) + b2
                                    let z2 = ReLU(a2)
                                    let a3  = (w3 * z1) + (w4 * z2) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let z1 = ReLU(a1)
                            let a2 = (w2 * x1) + b2
                            let z2 = ReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            MSE += (y1 - (yPred)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];
                    }
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * random_point[0]) + b2
                            let z2 = leakyReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (w2 * x1) + b2
                                    let z2 = leakyReLU(a2)
                                    let a3  = (w3 * z1) + (w4 * z2) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * x1) + b2
                            let z2 = leakyReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - (yPred))

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;  
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];

                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[1]

                            let a1 = (w1 * random_point[0]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * random_point[0]) + b2
                            let z2 = leakyReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * z1
                            let dcost_dw4 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w4 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let y1 = data[i][1]

                                    let a1 = (w1 * x1) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (w2 * x1) + b2
                                    let z2 = leakyReLU(a2)
                                    let a3  = (w3 * z1) + (w4 * z2) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let y1 = data[i][1]

                            let a1 = (w1 * x1) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (w2 * x1) + b2
                            let z2 = leakyReLU(a2)
                            let a3  = (w3 * z1) + (w4 * z2) + b3
                            let yPred = a3

                            MSE += (y1 - (yPred)) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2, b3]];
                    }
                }
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                alert('error')
            }
        }
    }
    
    static twoInput(data, nodes) {
        if (nodes == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfError").value == "MAE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MAE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[2]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * random_point[0]
                        let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * random_point[1]
                        let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let y1 = data[i][2]

                                let a1 = (w1 * x1) + (w2 * x2) + b1
                                let yPred = a1

                                cost += Math.abs(y1 - (yPred))
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let y1 = data[i][2]

                        MAE += Math.abs(y1 - ((w1 * x1) + (w2 * x2) + b1))

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                    return [iterationsX, costY, [w1, w2, b1]];
                } else if (document.getElementById("typeOfError").value == "MSE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MSE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[2]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = 2 * (yPred - target) * random_point[0]
                        let dcost_dw2 = 2 * (yPred - target) * random_point[1]
                        let dcost_db1 = 2 * (yPred - target) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let y1 = data[i][2]

                                let a1 = (w1 * x1) + (w2 * x2) + b1
                                let yPred = a1

                                cost += (y1 - (yPred)) ** 2
                            costY.push(cost/data.length);
                            }
                        }

                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let y1 = data[i][2]

                        MSE += (y1 - ((w1 * x1) + (w2 * x2) + b1)) ** 2

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                    return [iterationsX, costY, [w1, w2, b1]];
                }

                
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                if (document.getElementById("typeOfError").value == "MAE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MAE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[2]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        let cost = 0

                        let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - (sigmoid(a1)))) * random_point[0]
                        let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - (sigmoid(a1)))) * random_point[1]
                        let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - (sigmoid(a1)))) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        b1 -= learning_rate * dcost_db1;
                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let y1 = data[i][2]

                                let a1 = (w1 * x1) + (w2 * x2) + b1
                                let z1 = sigmoid(a1)
                                let yPred = z1

                                cost += Math.abs(y1 - (yPred))
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let y1 = data[i][2]

                        MAE += Math.abs(y1 - sigmoid((w1 * x1) + (w2 * x2) + b1))

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                    return [iterationsX, costY, [w1, w2, b1]];
                } else if (document.getElementById("typeOfError").value == "MSE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MSE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[2]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        let cost = (yPred - target) ** 2

                        let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a1) * (1 - (sigmoid(a1)))) * random_point[0]
                        let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a1) * (1 - (sigmoid(a1)))) * random_point[1]
                        let dcost_db1 = 2 * (yPred - target) *  (sigmoid(a1) * (1 - (sigmoid(a1)))) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        b1 -= learning_rate * dcost_db1;
                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let y1 = data[i][2]

                                let a1 = (w1 * x1) + (w2 * x2) + b1
                                let z1 = sigmoid(a1)
                                let yPred = z1

                                cost += (y1 - (yPred)) ** 2
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let y1 = data[i][2]

                        MSE += (y1 - sigmoid((w1 * x1) + (w2 * x2) + b1)) ** 2

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                    return [iterationsX, costY, [w1, w2, b1]];
                }
            }
        } else if (nodes == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let a2 = (a1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w3 * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let a2 = (a1 * w3) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let yPred = (a1 * w3) + b2
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let a2 = (a1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w3 * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * a1
                            let dcost_db1 = 2 * (yPred - target) * w3 * 1
                            let dcost_db2 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let a2 = (a1 * w3) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let yPred = (a1 * w3) + b2
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;    
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];                    
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let a2 = (w3 * a1) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1
                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * a1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let a2 = (w3 * a1) + b2
                                    let z1 = sigmoid(a2)
                                    let yPred = z1

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let a2 = (w3 * a1) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;  
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];                             
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let a2 = (w3 * a1) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * a1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let a2 = (w3 * a1) + b2
                                    let z1 = sigmoid(a2)
                                    let yPred = z1

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let a2 = (w3 * a1) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length; 
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];              
                    }
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w3 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w3 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * z1
                            let dcost_db1 = 2 * (yPred - target) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * z1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    }
                }
            }  else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w3 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w3 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * z1
                            let dcost_db1 = 2 * (yPred - target) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let yPred = a2
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * z1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * w3 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2) * (1 - sigmoid(a2))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w2 * x2) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w3) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w2 * x2) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w3) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, b1, b2]];
                    }
                }
            }
            /* start */
        } else if (nodes == "two") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w5 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w6 * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w5 * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w6 * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * a2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w5 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w6 * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let a3 = (a1 * w5) + (a2 * w6) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let yPred = a3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w5 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w6 * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w5 * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w6 * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * a1
                            let dcost_dw6 = 2 * (yPred - target) * a2
                            let dcost_db1 = 2 * (yPred - target) * w5 * 1
                            let dcost_db2 = 2 * (yPred - target) * w6 * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let a3 = (a1 * w5) + (a2 * w6) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let yPred = a3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;    
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];                    
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * a1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * a2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let a3 = (a1 * w5) + (a2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];                            
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = (yPred - target) ** 2

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * a1
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * a2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let a3 = (a1 * w5) + (a2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let a3 = (a1 * w5) + (a2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length; 
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];              
                    }
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w5 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w6 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w5 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w6 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w5 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w6 * ReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w5 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w6 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w5 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w6 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * z1
                            let dcost_dw6 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w5 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w6 * ReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * ReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    }
                }
            }  else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w5 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w6 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w5 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w6 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w5 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w6 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * w5 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w6 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w5 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w6 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * z1
                            let dcost_dw6 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w5 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w6 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let yPred = a3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    }
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MAE += Math.abs(y1 - yPred)
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[2]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w5 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w6 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1

                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;

                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let y1 = data[i][2]

                                    let a1 = (w1 * x1) + (w3 * x2) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w5) + (z2 * w6) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let y1 = data[i][2]

                            let a1 = (w1 * x1) + (w3 * x2) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w5) + (z2 * w6) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3
                            MSE += (y1 - yPred) ** 2
                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + w5 + ", " + w6 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, b1, b2, b3]];
                    }
                }
            }
        }
    }
    
    static threeInput(data, nodes) {
        if (nodes == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfError").value == "MAE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MAE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let w3 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[3]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * random_point[0]
                        let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * random_point[1]
                        let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * random_point[2]
                        let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        w3 -= learning_rate * dcost_dw3
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let x3 = data[i][2]
                                let y1 = data[i][3]

                                let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                let yPred = a1

                                cost += Math.abs(y1 - (yPred))
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let x3 = data[i][2]
                        let y1 = data[i][3]

                        MAE += Math.abs(y1 - ((w1 * x1) + (w2 * x2) + (w3 * x3) + b1))

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                    return [iterationsX, costY, [w1, w2, w3, b1]];

                } else if (document.getElementById("typeOfError").value == "MSE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MSE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let w3 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[3]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                        let yPred = a1

                        let cost = 0

                        let dcost_dw1 = 2 * (yPred - target) * random_point[0]
                        let dcost_dw2 = 2 * (yPred - target) * random_point[1]
                        let dcost_dw3 = 2 * (yPred - target) * random_point[2]
                        let dcost_db1 = 2 * (yPred - target) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        w3 -= learning_rate * dcost_dw3
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let x3 = data[i][2]
                                let y1 = data[i][3]

                                let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                let yPred = a1

                                cost += (y1 - (yPred)) ** 2
                            costY.push(cost/data.length);
                            }
                        }

                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let x3 = data[i][2]
                        let y1 = data[i][3]

                        MSE += (y1 - ((w1 * x1) + (w2 * x2) + (w3 * x3) + b1)) ** 2

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                    return [iterationsX, costY, [w1, w2, w3, b1]];
                }
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                if (document.getElementById("typeOfError").value == "MAE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MAE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let w3 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[3]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        let cost = 0

                        let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[0]
                        let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[1]
                        let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[2]
                        let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a1) * (1 - sigmoid(a1))) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        w3 -= learning_rate * dcost_dw3
                        b1 -= learning_rate * dcost_db1;

                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let x3 = data[i][2]
                                let y1 = data[i][3]

                                let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                let z1 = sigmoid(a1)
                                let yPred = z1

                                cost += Math.abs(y1 - (yPred))
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let x3 = data[i][2]
                        let y1 = data[i][3]

                        let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        MAE += Math.abs(y1 - yPred)

                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                    return [iterationsX, costY, [w1, w2, w3, b1]];

                } else if (document.getElementById("typeOfError").value == "MSE") {
                    let iterationsX = [];
                    let costY = new Array();
                    let MSE = 0;
                    let w1 = Math.random() * 2 - 1
                    let w2 = Math.random() * 2 - 1
                    let w3 = Math.random() * 2 - 1
                    let b1 = Math.random() * 2 - 1
                    const learning_rate = Number(document.getElementById("rateToLearn").value);

                    const iterations = Number(document.getElementById("iterationsToLearn").value);
                    

                    for (let i = 0; i <= iterations; i++) {
                        let random_index = Math.floor(Math.random() * data.length);
                        let random_point = data[random_index];
                        let target = random_point[3]

                        let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        let cost = 0

                        let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[0]
                        let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[1]
                        let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a1) * (1 - sigmoid(a1))) * random_point[2]
                        let dcost_db1 = 2 * (yPred - target) * (sigmoid(a1) * (1 - sigmoid(a1))) * 1

                        w1 -= learning_rate * dcost_dw1;
                        w2 -= learning_rate * dcost_dw2
                        w3 -= learning_rate * dcost_dw3
                        b1 -= learning_rate * dcost_db1;
                        if (i % Number(document.getElementById("moduloIteration").value) == 0){
                            iterationsX.push(i);
                            for (let i = 0; i < data.length; i++) {
                                let x1 = data[i][0]
                                let x2 = data[i][1]
                                let x3 = data[i][2]
                                let y1 = data[i][3]

                                let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                let z1 = sigmoid(a1)
                                let yPred = z1

                                cost += (y1 - (yPred)) ** 2
                            costY.push(cost/data.length);
                            }
                        }
                    }

                    for (let i = 0; i < data.length; i++) {
                        let x1 = data[i][0]
                        let x2 = data[i][1]
                        let x3 = data[i][2]
                        let y1 = data[i][3]

                        let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                        let z1 = sigmoid(a1)
                        let yPred = z1

                        MSE += (y1 - yPred) ** 2
                    }

                    document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + b1
                    document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                    return [iterationsX, costY, [w1, w2, w3, b1]];
                }                
            }
        } else if (nodes == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let a2 = (a1 * w4) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w4 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w4 * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w4 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let a2 = (a1 * w4) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let a2 = (a1 * w4) + b2
                            let yPred = a2

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let a2 = (a1 * w4) + b2
                            let yPred = a2

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w4 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * w4 * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * a1
                            let dcost_db1 = 2 * (yPred - target) * w4 * 1
                            let dcost_db2 = 2 * (yPred - target) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let a2 = (a1 * w4) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let a2 = (a1 * w4) + b2
                            let yPred = a2

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    }                
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let a2 = (a1 * w4) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * a1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let a2 = (a1 * w4) + b2
                                    let z1 = sigmoid(a2)
                                    let yPred = z1

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let a2 = (a1 * w4) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let a2 = (a1 * w4) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * a1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let a2 = (a1 * w4) + b2
                                    let z1 = sigmoid(a2)
                                    let yPred = z1

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let a2 = (a1 * w4) + b2
                            let z1 = sigmoid(a2)
                            let yPred = z1

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    } 
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                /* start 5/29/26 */
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w4 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w4 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * w4 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * z1
                            let dcost_db1 = 2 * (yPred - target) * w4 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    }                
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * z1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = ReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = ReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    } 
                }
            }  else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w4 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let yPred = a2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w4 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w4 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * w4 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * z1
                            let dcost_db1 = 2 * (yPred - target) * w4 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let yPred = a2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let yPred = a2

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    }                
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * z1
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w2 * random_point[1]) + (w3 * random_point[2]) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * z1
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * w4 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a2 * (1 - sigmoid(a2)))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2
                            w3 -= learning_rate * dcost_dw3
                            w4 -= learning_rate * dcost_dw4
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                                    let z1 = leakyReLU(a1)
                                    let a2 = (z1 * w4) + b2
                                    let z2 = sigmoid(a2)
                                    let yPred = z2

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w2 * x2) + (w3 * x3) + b1
                            let z1 = leakyReLU(a1)
                            let a2 = (z1 * w4) + b2
                            let z2 = sigmoid(a2)
                            let yPred = z2

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " + b1 + ", " + b2
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, b1, b2]];                        
                    } 
                }
            }
        } else if (nodes == "two") {
            /* 5/30/26 */
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w7 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w8 * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w7 * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w8 * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * w7 * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * w8 * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * a1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * a2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w7 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w8 * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                            if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let a3 = (a1 * w7) + (a2 * w8) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let yPred = a3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w7 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w8 * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w7 * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w8 * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * w7 * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * w8 * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * a1
                            let dcost_dw8 = 2 * (yPred - target) * a2
                            let dcost_db1 = 2 * (yPred - target) * w7 * 1
                            let dcost_db2 = 2 * (yPred - target) * w8 * 1
                            let dcost_db3 = 2 * (yPred - target) * 1



                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let a3 = (a1 * w7) + (a2 * w8) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let yPred = a3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    }
                    /* left off 5/30/26 */                
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * a1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * a2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let a3 = (a1 * w7) + (a2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * a1
                            let dcost_dw8 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * a2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let a3 = (a1 * w7) + (a2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let a3 = (a1 * w7) + (a2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    } 
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                /* start 5/29/26 */
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w7 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w8 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w7 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w8 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * w7 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * w8 * ReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w7 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w8 * ReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w7 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w8 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w7 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w8 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * w7 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * w8 * ReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * z1
                            let dcost_dw8 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w7 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w8 * ReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    }                
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw8 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * ReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * ReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = ReLU(a1)
                                    let z2 = ReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = ReLU(a1)
                            let z2 = ReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    } 
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * w7 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * w8 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * w7 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * w8 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * w7 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * w8 * leakyReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * z1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * w7 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * w8 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let yPred = a3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * w7 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * w8 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * w7 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * w8 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * w7 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * w8 * leakyReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * z1
                            let dcost_dw8 = 2 * (yPred - target) * z2
                            let dcost_db1 = 2 * (yPred - target) * w7 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * w8 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let yPred = a3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let yPred = a3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    }                
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    if (document.getElementById("typeOfError").value == "MAE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MAE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0

                            let dcost_dw1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw8 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = (yPred - target) / Math.abs((yPred - target)) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += Math.abs(y1 - (yPred))
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MAE += Math.abs(y1 - yPred)

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MAE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];
                    } else if (document.getElementById("typeOfError").value == "MSE") {
                        let iterationsX = [];
                        let costY = new Array();
                        let MSE = 0;
                        let w1 = Math.random() * 2 - 1
                        let w2 = Math.random() * 2 - 1
                        let w3 = Math.random() * 2 - 1
                        let w4 = Math.random() * 2 - 1
                        let w5 = Math.random() * 2 - 1
                        let w6 = Math.random() * 2 - 1
                        let w7 = Math.random() * 2 - 1
                        let w8 = Math.random() * 2 - 1
                        let b1 = Math.random() * 2 - 1
                        let b2 = Math.random() * 2 - 1
                        let b3 = Math.random() * 2 - 1
                        const learning_rate = Number(document.getElementById("rateToLearn").value);

                        const iterations = Number(document.getElementById("iterationsToLearn").value);
                        

                        for (let i = 0; i <= iterations; i++) {
                            let random_index = Math.floor(Math.random() * data.length);
                            let random_point = data[random_index];
                            let target = random_point[3]

                            let a1 = (w1 * random_point[0]) + (w3 * random_point[1]) + (w5 * random_point[2]) + b1
                            let a2 = (w2 * random_point[0]) + (w4 * random_point[1]) + (w6 * random_point[2]) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            let cost = 0;

                            let dcost_dw1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[0]
                            let dcost_dw2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[0]
                            let dcost_dw3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[1]
                            let dcost_dw4 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[1]
                            let dcost_dw5 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * random_point[2]
                            let dcost_dw6 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * random_point[2]
                            let dcost_dw7 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z1
                            let dcost_dw8 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * z2
                            let dcost_db1 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w7 * leakyReLUPrime(a1) * 1
                            let dcost_db2 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * w8 * leakyReLUPrime(a2) * 1
                            let dcost_db3 = 2 * (yPred - target) * (sigmoid(a3) * (1 - sigmoid(a3))) * 1


                            w1 -= learning_rate * dcost_dw1;
                            w2 -= learning_rate * dcost_dw2;
                            w3 -= learning_rate * dcost_dw3;
                            w4 -= learning_rate * dcost_dw4;
                            w5 -= learning_rate * dcost_dw5;
                            w6 -= learning_rate * dcost_dw6;
                            w7 -= learning_rate * dcost_dw7;
                            w8 -= learning_rate * dcost_dw8;
                            b1 -= learning_rate * dcost_db1;
                            b2 -= learning_rate * dcost_db2;
                            b3 -= learning_rate * dcost_db3;

                           if (i % Number(document.getElementById("moduloIteration").value) == 0){
                                iterationsX.push(i);
                                for (let i = 0; i < data.length; i++) {
                                    let x1 = data[i][0]
                                    let x2 = data[i][1]
                                    let x3 = data[i][2]
                                    let y1 = data[i][3]

                                    let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                                    let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                                    let z1 = leakyReLU(a1)
                                    let z2 = leakyReLU(a2)
                                    let a3 = (z1 * w7) + (z2 * w8) + b3
                                    let z3 = sigmoid(a3)
                                    let yPred = z3

                                    cost += (y1 - (yPred)) ** 2
                                costY.push(cost/data.length);
                                }
                            }
                        }

                        for (let i = 0; i < data.length; i++) {
                            let x1 = data[i][0]
                            let x2 = data[i][1]
                            let x3 = data[i][2]
                            let y1 = data[i][3]

                            let a1 = (w1 * x1) + (w3 * x2) + (w5 * x3) + b1
                            let a2 = (w2 * x1) + (w4 * x2) + (w6 * x3) + b2
                            let z1 = leakyReLU(a1)
                            let z2 = leakyReLU(a2)
                            let a3 = (z1 * w7) + (z2 * w8) + b3
                            let z3 = sigmoid(a3)
                            let yPred = z3

                            MSE += (yPred - y1) ** 2

                        }

                        document.getElementById("networkParametersView").textContent = "Parameters: " + w1 + ", " + w2 + ", " + w3 + ", " + w4 + ", " +  w5 + ", " + w6 + ", " + w7 + ", " + w8 + ", " + b1 + ", " + b2 + ", " + b3
                        document.getElementById("errorView").textContent = "Error: " + MSE / data.length;
                        return [iterationsX, costY, [w1, w2, w3, w4, w5, w6, w7, w8, b1, b2, b3]];                        
                    } 
                }
            }
        }
    }
}