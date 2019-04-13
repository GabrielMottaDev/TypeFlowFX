var map = new Map();

setTimeout(function () {
    var typeBoxs = document.getElementsByClassName("type-box");
    for (var i = 0; i < typeBoxs.length; i++) {
        var typeBox = typeBoxs[i];
        var attribute = typeBox.getAttribute("speed").split(";");
        var toReplace = typeBox.firstElementChild;
        typeWriter(i, toReplace, Number(attribute[0]), Number(attribute[1]));
    }
}, 1000);

function typeWriter(typeBox, target, typeSpeed, switchSpeed) {
    var numTypeBox = typeBox;
    typeBox = document.getElementsByClassName("type-box")[numTypeBox];
    target = typeBox.firstElementChild;
    var attribute = typeBox.getAttribute("speed").split(";");

    typeSpeed = Number(attribute[0]);
    switchSpeed = Number(attribute[1]);

    var charPos = 0;
    var textPos = 0;
    var txts = [];
    for (var ele of map.entries()) {
        if (ele[0] == numTypeBox) {
            charPos = ele[1].charPos;
            textPos = ele[1].textPos;
            txts = ele[1].textsToWrite;
            break;
        }
    }

    var preTxts = [];
    var preChildNodes = typeBox.childNodes;
    for (var i = 0; i < preChildNodes.length; i++) {
        if (i % 2 != 0) {
            if (i != 1) {
                preTxts.push([preChildNodes[i].attributes, preChildNodes[i].innerHTML]);
            }
        }
    }


    //TODO: ARRAY EQUAL
    if (!isEqual(txts, preTxts)) {
        /*console.log("");
        console.log(txts);
        console.log(preTxts);
        console.log("");*/
        txts = preTxts;
    }

    var txt = txts[textPos][1];

    if (charPos < txt.length) {
        if (charPos == 0) {
            target.innerHTML = "";

            for (var i = 0; i < target.attributes.length; i++) {
                target.removeAttributeNode(target.attributes[i]);
            }

            for (var i = 0; i < txts[textPos][0].length; i++) {
                target.setAttributeNode(txts[textPos][0][i].cloneNode(true));
            }
        }
        target.innerHTML += txt.charAt(charPos);
        charPos++;
        map.set(numTypeBox, { charPos: charPos, textsToWrite: txts, textPos: textPos });
        setTimeout(function () { typeWriter(numTypeBox, target, typeSpeed, switchSpeed) }, typeSpeed);
    } else {
        charPos = 0;
        if (txts.length > textPos + 1) {
            textPos += 1;
        } else {
            textPos = 0;
        }
        map.set(numTypeBox, { charPos: charPos, textsToWrite: txts, textPos: textPos });
        setTimeout(function () { typeWriter(numTypeBox, target, typeSpeed, switchSpeed) }, switchSpeed);
    }
}

function isEqual(array1, array2) {
    var str1 = "";
    for (var str in array1) {
        str1 += str;
    }
    var str2 = "";
    for (var str in array2) {
        str2 += str;
    }
    return str1 == str2;
}
