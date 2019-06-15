var altura = 1500.00;
$(document).ready(function() {
    spawnBaloes();

    upBaloes();
});

function spawnBaloes() {
    altura = 1500.00;
    var baloesContainer = document.getElementsByClassName("baloesContainer");
    baloesContainer = baloesContainer[0];

    var baloes = "<div class=\"baloes\">";
    for (var i = 0; i < 15; i++) {
        baloes += getBalao();
    }

    baloes += "</div>"
    baloesContainer.innerHTML = baloes;
    setTimeout(spawnBaloes, 5 * 1000);
}

var cores = 0;

function getBalao() {
    var corReturn = "nenhuma";
    if (cores == 0) {
        corReturn = "green";
    } else if (cores == 1) {
        corReturn = "red";
    } else if (cores == 2) {
        corReturn = "purple";
    } else if (cores == 3) {
        corReturn = "blue";
    } else if (cores == 4) {
        corReturn = "yellow";
    }
    if (cores >= 4) {
        cores = 0;
    } else {
        cores = cores + 1;
    }
    return "<div class=\"balao " + corReturn + "\" style=\"matrix(" + getSize() + ", 0, 0, " + getSize() + ", 0.00, " + altura + ")\"></div>";
}

function getSize() {
    var random = Math.floor((Math.random() * 8) + 1);
    if (random == 1) {
        return 1.00;
    } else if (random == 2) {
        return 0.95;
    } else if (random == 3) {
        return 0.90;
    } else if (random == 4) {
        return 0.85;
    } else if (random == 5) {
        return 0.80;
    } else if (random == 6) {
        return 0.75;
    } else if (random == 7) {
        return 0.70;
    } else if (random == 8) {
        return 0.65;
    }
}

function changeMatrixXZ(matrix, width, height) {
    matrix = matrix.replace("matrix(", "");
    matrix = matrix.replace(")", "");
    var valores = matrix.split(", ");
    valores[4] = width;
    valores[5] = parseFloat(valores[5]) - 2;
    return "matrix(" + valores[0] + ", " + valores[1] + ", " + valores[2] + ", " + valores[3] + ", " + valores[4] + ", " + valores[5] + ")";
}

function upBaloes() {
    altura = altura - 1.00;
    var baloes = document.getElementsByClassName("balao");
    for (var i = 0; i < baloes.length; i++) {
        var balao = baloes[i];
        var matrixAtual = balao.style.transform;
        if (matrixAtual == "") {
            var size = getSize();
            matrixAtual = "matrix(" + size + ", 0, 0, " + size + ", 0.00, " + (altura - ((Math.random() * 500) + 1)) + ")";
        }
        var newMatrix = changeMatrixXZ(matrixAtual, (i * 130), altura);
        balao.style.transform = newMatrix;
    }
    setTimeout(upBaloes, 5);
}