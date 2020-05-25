

const NUCLEOTIDES = ["A", "T", "G", "C"];

function buildDna(length, gcCount) {
    let atCount = 1 - gcCount;
    let result = '';

    let aCounter = Math.floor(atCount * length / 2);
    let tCounter = Math.floor(atCount * length / 2);
    let cCounter = Math.floor(gcCount * length / 2);
    let gCounter = Math.floor(gcCount * length / 2);

    for (let i = 0; i < length; i++) {
        let check= false;
        while (!check) {
            let n = NUCLEOTIDES[randomInteger(0, 3)];

            if (n === "A" && aCounter > 0) {
                aCounter--;
                result += n;
                check = true;
            }

            if (n === "G" && gCounter > 0) {
                gCounter--;
                result += n;
                check = true;
            }

            if (n === "T" && tCounter > 0) {
                tCounter--;
                result += n;
                check = true;
            }

            if (n === "C" && cCounter > 0) {
                cCounter--;
                result += n;
                check = true;
            }

            if (aCounter + gCounter + tCounter + cCounter === 0 ) break;
        }
    }

    return result;
}

function reverseDNA(DNA) {
    let reversedDNA = '';

    for (let i = DNA.length - 1; i >= 0; i--) {
        switch (DNA.charAt(i)) {
            case 'A':
                reversedDNA += 'T';
                break;
            case 'T':
                reversedDNA += 'A';
                break;
            case 'G':
                reversedDNA += 'C';
                break;
            case 'C':
                reversedDNA += 'G';
                break;
        }
    }

    return reversedDNA;
}

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const DNA = {
    buildDna,
    reverseDNA
};

module.exports = DNA;
