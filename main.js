let data = new Array();
let inputChoice;
let nodeChoice;
let myGraph;
let sendParameters;
let sentParameters;
let initialSave;
let retrieveSaved;
let dataUsedCSV;

Chart.defaults.color = '#000000';

function main() {
    if (localStorage.getItem("network") !== null) {
        retrieveSaved = localStorage.getItem("network");
        sentParameters = JSON.parse(localStorage.getItem("network"))
        document.getElementById("predictNewNetwork").disabled = true
        document.getElementById("deleteNetwork").disabled = false
        document.getElementById("typeOfActivationHidden").value = localStorage.getItem("activation")
        document.getElementById("inputVariablesMax").value = localStorage.getItem("inputChoice")
        document.getElementById("typeOfNetwork").value = localStorage.getItem("networkType")
        document.getElementById("nodesInHidden").value = localStorage.getItem("nodeChoiceHidden")
    } else {
        document.getElementById("predictionOnOldNetwork").disabled = true
        document.getElementById("deleteNetwork").disabled = true
        document.getElementById("typeOfActivationHidden").value = "none"
        document.getElementById("inputVariablesMax").value = "choose"
        document.getElementById("typeOfNetwork").value = "choose"
        document.getElementById("nodesInHidden").value = "none"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("csvFileInput").addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const csvRaw = e.target.result;
            const csv2DArray = csvRaw.split('\n').map(line => line.split(','));

            console.log(csv2DArray)
            data = csv2DArray
            dataUsedCSV = true
        };


        reader.readAsText(file)
    })
});


function sendVariables() {

    inputChoice = document.getElementById("inputVariablesMax").value;

    const x1 = document.getElementById("variable1");
    const x2 = document.getElementById("variable2");
    const x3 = document.getElementById("variable3");
    const y1 = document.getElementById("y1");

    const x1V = Number(x1.value);
    const x2V = Number(x2.value);
    const x3V = Number(x3.value);
    const y1V = Number(y1.value);

    if (dataUsedCSV != true) {
        if (inputChoice == "one") {
            data.push([x1V, y1V]);
        } else if (inputChoice == "two") {
            data.push([x1V, x2V, y1V]);
        } else if (inputChoice == "three") {
            data.push([x1V, x2V, x3V, y1V])
        } 
    } else {
        data.push([0])
        data.pop()
        dataUsedCSV = false
    }
    document.getElementById("dataView").textContent = "[" + data + "]";

    x1.value = ""
    x2.value = ""
    x3.value = ""
    y1.value = ""

}

function initiateGraph() {
    document.getElementById("btnStart").disabled = true
    nodeChoice = document.getElementById("nodesInHidden").value
    if (inputChoice == "one") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.oneInput(data, nodeChoice);
        sentParameters = sendParameters;    
        myGraph = new Chart("myCanvas", {
        type: "line",
        data: {
            labels: xInd,
            datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,255,255,1.0)",
            borderColor: "rgb(0, 0, 0)",
            data: yDep
            }]
        },
        });
    } else if (inputChoice == "two") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.twoInput(data, nodeChoice);
        sentParameters = sendParameters; 
        myGraph = new Chart("myCanvas", {
        type: "line",
        data: {
            labels: xInd,
            datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,255,255,1.0)",
            borderColor: "rgb(0, 0, 0)",
            data: yDep
            }]
        },
        });
    } else if (inputChoice == "three") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.threeInput(data, nodeChoice);
        sentParameters = sendParameters; 
        myGraph = new Chart("myCanvas", {
        type: "line",
        data: {
            labels: xInd,
            datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,255,255,1.0)",
            borderColor: "rgb(0, 0, 0)",
            data: yDep
            }]
        },
        });
    }
}

function computeNetwork() {
    nodeChoice = document.getElementById("nodesInHidden").value
    if (inputChoice == "one") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.oneInput(data, nodeChoice);  
        sentParameters = sendParameters;
        myGraph.data.labels = xInd
        myGraph.data.datasets[0].data = yDep;
        myGraph.update();  
    } else if (inputChoice == "two") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.twoInput(data, nodeChoice);  
        sentParameters = sendParameters;
        myGraph.data.labels = xInd
        myGraph.data.datasets[0].data = yDep;
        myGraph.update();  
    } else if (inputChoice == "three") {
        let [xInd, yDep, sendParameters=parameters] = NeuralNetwork.threeInput(data, nodeChoice);  
        sentParameters = sendParameters;
        myGraph.data.labels = xInd
        myGraph.data.datasets[0].data = yDep;
        myGraph.update();  
    }
}

function deleteVariables() {
    data.pop()
    document.getElementById("dataView").textContent = "[" + data + "]";
}

function predictNewPoint() {
    const x1N = document.getElementById("variable1Pred");
    const x2N = document.getElementById("variable2Pred");
    const x3N = document.getElementById("variable3Pred");

    const x1VN = Number(x1N.value);
    const x2VN = Number(x2N.value);
    const x3VN = Number(x3N.value);

    if (inputChoice == "one") {
        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + sentParameters[1]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            }
                        
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let a2 = (sentParameters[1] * a1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;
                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let z1 = ReLU(a1)
                    let a2 = (sentParameters[1] * z1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;  
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let z1 = leakyReLU(a1)
                    let a2 = (sentParameters[1] * z1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;  
                }
            }
        }else if (nodeChoice == "two") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let a3  = (sentParameters[2] * a1) + (sentParameters[3] * a2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let z2 = ReLU(a2)
                    let a3  = (sentParameters[2] * z1) + (sentParameters[3] * z2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let z2 = leakyReLU(a2)
                    let a3  = (sentParameters[2] * z1) + (sentParameters[3] * z2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        }
    } else if (inputChoice == "two") {

        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[2]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[2]
                let z1 = sigmoid(a1)
                let yPred = z1
                document.getElementById("predictOutput").textContent = yPred
            }
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let a2 = (a1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2                    
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let a2 = (sentParameters[2] * a1) + sentParameters[4]
                    let z1 = sigmoid(a2)
                    let yPred = z1
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        } else if (nodeChoice == "two") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let a3 = (a1 * sentParameters[4]) + (a2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3        
                    document.getElementById("predictOutput").textContent = yPred          
                } else if (document.getElementById("typeOfNetwork").value == "binary") {        
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let a3 = (a1 * sentParameters[4]) + (a2 * sentParameters[5]) + sentParameters[8]                           
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        }
    } else if (inputChoice == "three") {

        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[3]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            } else if (document.getElementById("typeOfNetwork").value == "binary") { 
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[3]
                let z1 = sigmoid(a1)
                let yPred = z1
                document.getElementById("predictOutput").textContent = yPred
            }
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let a2 = (a1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let a2 = (a1 * sentParameters[3]) + sentParameters[5]
                    let z1 = sigmoid(a2)
                    let yPred = z1
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }                
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }                
            }
        } else if (nodeChoice == "two") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") { 
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let a3 = (a1 * sentParameters[6]) + (a2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let a3 = (a1 * sentParameters[6]) + (a2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred                    
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred                    
                }
            }
        }
    }
}

function saveNetwork() {
    initialSave = localStorage.setItem("network", JSON.stringify(sentParameters))
    document.getElementById("predictNewNetwork").disabled = true
    document.getElementById("predictionOnOldNetwork").disabled = false
    document.getElementById("deleteNetwork").disabled = false
    localStorage.setItem("nodeChoiceHidden", document.getElementById("nodesInHidden").value)
    localStorage.setItem("inputChoice", document.getElementById("inputVariablesMax").value)
    localStorage.setItem("activation", document.getElementById("typeOfActivationHidden").value)
    localStorage.setItem('networkType', document.getElementById("typeOfNetwork").value)
}


function predictionOnOldNetwork() {

    inputChoice = document.getElementById("inputVariablesMax").value;
    nodeChoice = document.getElementById("nodesInHidden").value

    const x1N = document.getElementById("variable1Pred");
    const x2N = document.getElementById("variable2Pred");
    const x3N = document.getElementById("variable3Pred");

    const x1VN = Number(x1N.value);
    const x2VN = Number(x2N.value);
    const x3VN = Number(x3N.value);

    console.log(x1VN, x2VN, x3VN)
    
    if (inputChoice == "one") {
        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + sentParameters[1]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            }
                        
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let a2 = (sentParameters[1] * a1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;
                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let z1 = ReLU(a1)
                    let a2 = (sentParameters[1] * z1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;  
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[2]
                    let z1 = leakyReLU(a1)
                    let a2 = (sentParameters[1] * z1) + sentParameters[3]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred;  
                }
            }
        }else if (nodeChoice == "two") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                if (document.getElementById("typeOfActivationHidden").value == "none") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let a3  = (sentParameters[2] * a1) + (sentParameters[3] * a2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let z2 = ReLU(a2)
                    let a3  = (sentParameters[2] * z1) + (sentParameters[3] * z2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                    let a1 = (sentParameters[0] * x1VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (sentParameters[1] * x1VN) + sentParameters[5]
                    let z2 = leakyReLU(a2)
                    let a3  = (sentParameters[2] * z1) + (sentParameters[3] * z2) + sentParameters[6]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        }
    } else if (inputChoice == "two") {

        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[2]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            } else if (document.getElementById("typeOfNetwork").value == "binary") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[2]
                let z1 = sigmoid(a1)
                let yPred = z1
                document.getElementById("predictOutput").textContent = yPred
            }
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let a2 = (a1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2                    
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let a2 = (sentParameters[2] * a1) + sentParameters[4]
                    let z1 = sigmoid(a2)
                    let yPred = z1
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + sentParameters[3]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[2]) + sentParameters[4]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        } else if (nodeChoice == "two") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let a3 = (a1 * sentParameters[4]) + (a2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3        
                    document.getElementById("predictOutput").textContent = yPred          
                } else if (document.getElementById("typeOfNetwork").value == "binary") {        
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let a3 = (a1 * sentParameters[4]) + (a2 * sentParameters[5]) + sentParameters[8]                           
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + sentParameters[6]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + sentParameters[7]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[4]) + (z2 * sentParameters[5]) + sentParameters[8]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            }
        }
    } else if (inputChoice == "three") {

        if (nodeChoice == "none" && document.getElementById("typeOfActivationHidden").value == "none") {
            if (document.getElementById("typeOfNetwork").value == "regression") {
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[3]
                let yPred = a1
                document.getElementById("predictOutput").textContent = yPred
            } else if (document.getElementById("typeOfNetwork").value == "binary") { 
                let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[3]
                let z1 = sigmoid(a1)
                let yPred = z1
                document.getElementById("predictOutput").textContent = yPred
            }
        } else if (nodeChoice == "one") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let a2 = (a1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let a2 = (a1 * sentParameters[3]) + sentParameters[5]
                    let z1 = sigmoid(a2)
                    let yPred = z1
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = ReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }                
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let yPred = a2
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[1] * x2VN) + (sentParameters[2] * x3VN) + sentParameters[4]
                    let z1 = leakyReLU(a1)
                    let a2 = (z1 * sentParameters[3]) + sentParameters[5]
                    let z2 = sigmoid(a2)
                    let yPred = z2
                    document.getElementById("predictOutput").textContent = yPred
                }                
            }
        } else if (nodeChoice == "two") {
            if (document.getElementById("typeOfActivationHidden").value == "none") {
                if (document.getElementById("typeOfNetwork").value == "regression") { 
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let a3 = (a1 * sentParameters[6]) + (a2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let a3 = (a1 * sentParameters[6]) + (a2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "relu") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = ReLU(a1)
                    let z2 = ReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred                    
                }
            } else if (document.getElementById("typeOfActivationHidden").value == "leakyReLU") {
                if (document.getElementById("typeOfNetwork").value == "regression") {      
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let yPred = a3
                    document.getElementById("predictOutput").textContent = yPred
                } else if (document.getElementById("typeOfNetwork").value  == "binary") {
                    let a1 = (sentParameters[0] * x1VN) + (sentParameters[2] * x2VN) + (sentParameters[4] * x3VN) + sentParameters[8]
                    let a2 = (sentParameters[1] * x1VN) + (sentParameters[3] * x2VN) + (sentParameters[5] * x3VN) + sentParameters[9]
                    let z1 = leakyReLU(a1)
                    let z2 = leakyReLU(a2)
                    let a3 = (z1 * sentParameters[6]) + (z2 * sentParameters[7]) + sentParameters[10]
                    let z3 = sigmoid(a3)
                    let yPred = z3
                    document.getElementById("predictOutput").textContent = yPred                    
                }
            }
        }
    }    
}

function deleteNetwork() {
    localStorage.removeItem("network")
    document.getElementById("predictNewNetwork").disabled = false
    document.getElementById("predictionOnOldNetwork").disabled = true
    document.getElementById("deleteNetwork").disabled = true
    localStorage.removeItem("activation")
    localStorage.removeItem("inputChoice")
    localStorage.removeItem("networkType")
    localStorage.removeItem("nodeChoiceHidden")
    document.getElementById("typeOfActivationHidden").value = "none"
    document.getElementById("inputVariablesMax").value = "choose"
    document.getElementById("typeOfNetwork").value = "choose"
    document.getElementById("nodesInHidden").value = "none"
    document.getElementById("predictOutput").textContent = "";
}