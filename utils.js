function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function ReLU(x) {
    return Math.max(0, x)
}

function ReLUPrime(x) {
    if (x <= 0) {
        return 0;
    } else if (x > 0) {
        return 1;
    }
}

function leakyReLU(x) {
    if (x >= 0) {
        return x;
    } else if (x < 0) {
        return 0.01 * x;
    }
}

function leakyReLUPrime(x) {
    if (x > 0) {
        return 1;
    } else if (x < 0) {
        return 0.01;
    }
}
