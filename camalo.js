var chars = "abcdefghijklmnopqrstuvwxyz";

function handleEncrypt() {
    var plaintext = normalize(getById("p").value);
    if (validate(plaintext, 'Please enter some plaintext.')) return;
    var key = normalize(getById("key").value);
    var pc = normalize(getById("pc").value);
    getById("c").value = Encryptcorumnar(plaintext, key, pc);
}
function handleDecrypt() {
    var corumnar = normalize(getById("c").value);
    if (validate(corumnar, 'Please enter some corumnar (letters only).')) return;
    var key = normalize(getById("key").value);
    getById("p").value = Decryptcorumnar(corumnar, key);
}

function Encryptcorumnar(plaintext, key, pc) {
    var klen = key.length;
    if (pc == "") pc = "x";
    while (plaintext.length % klen != 0) {
        plaintext += pc.charAt(0);
    }
    var colLength = plaintext.length / klen;
    var corumnar = "";
    k = 0;
    for (i = 0; i < klen; i++) {
        while (k < 26) {
            t = key.indexOf(chars.charAt(k));
            arrkw = key.split("");
            arrkw[t] = "_";
            key = arrkw.join("");
            if (t >= 0) break;
            else k++;
        }
        for (j = 0; j < colLength; j++) {
            corumnar += plaintext.charAt(j * klen + t);
        }
    }
    return corumnar;
}

function Decryptcorumnar(corumnar, keyword) {
    var klen = keyword.length;
    if (klen <= 1) {
        alert("keyword should be at least 2 characters long");
        return;
    }
    if (corumnar.length % klen != 0) {
        alert("corumnar has not been padded, the result may be incorrect (incorrect keyword?).");
    }
    // first we put the text into columns based on keyword length
    var cols = new Array(klen);
    var colLength = corumnar.length / klen;
    for (i = 0; i < klen; i++) cols[i] = corumnar.substr(i * colLength, colLength);
    // now we rearrange the columns so that they are in their unscrambled state
    var newcols = new Array(klen);
    j = 0;
    i = 0;
    while (j < klen) {
        t = keyword.indexOf(chars.charAt(i));
        if (t >= 0) {
            newcols[t] = cols[j++];
            arrkw = keyword.split("");
            arrkw[t] = "_";
            keyword = arrkw.join("");
        } else i++;
    }
    // now read off the columns row-wise
    var plaintext = "";
    for (i = 0; i < colLength; i++) {
        for (j = 0; j < klen; j++) {
            plaintext += newcols[j].charAt(i);
        }
    }
    return plaintext;
}

function validate(text, message) {
    if (text.length < 1) {
        alert(message);
    }
}

function getById(id) {
    return document.getElementById(id);
}

function normalize(value) {
    return value.toLowerCase().replace(/[^a-z]/g, "");
}


