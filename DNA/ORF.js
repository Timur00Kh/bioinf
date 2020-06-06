const matchAll = require('string.prototype.matchall');
matchAll.shim()

const STOP_CODONS = ["TAA", "TAG", "TGA"];
const START_CODONS = ["ATG"];
const MINIMUM_ORF_LENGTH = 10;


function findORFsOld(DNA, min_length) {
    const STOP_POSITIONS =
        STOP_CODONS
            .reduce((sum, a) => [
                ...sum,
                ...Array.from(DNA.matchAll(a)).map(e => e.index)
            ], [])
            .sort(((a, b) => a - b));

    const START_POSITIONS =
        START_CODONS
            .reduce((sum, a) => [
                ...sum,
                ...Array.from(DNA.matchAll(a)).map(e => e.index)
            ], [])
            .sort(((a, b) => a - b));

    const result = [];


    for (let i = 0; i < STOP_POSITIONS.length - 1; i++)  {
        let end = STOP_POSITIONS[i] + 3;
        for (let j = 0; i < START_POSITIONS.length - 1; j++)  {
            let start = START_POSITIONS[j];
            if (start < end) {
                result.push({
                    start, end,
                    value: DNA.substring(start, end)
                })
            } else {
                break;
            }
        }
    }

    return result
        .filter(e => e.value.length % 3 === 0)
        .filter(e => e.value.length >= (min_length || MINIMUM_ORF_LENGTH));
}

function findORFs(DNA, min_length) {
    DNA = DNA.toUpperCase();
    let result = [];

    for (const START_CODON of START_CODONS) {
        let index = DNA.indexOf(START_CODON);

        let currentSeq = '';
        while (index != -1) {
            for (let i = index; i + 3 < DNA.length; i+= 3) {
                let currentTriplet = DNA.substring(i, i + 3);

                if (currentTriplet === START_CODON && currentSeq.length === 0) {
                    currentSeq += currentTriplet;
                } else {
                    if (currentSeq.length > 0) {
                        currentSeq += currentTriplet;
                    }
                }

                if (STOP_CODONS.find(e => e === currentTriplet)) {
                    result.push({
                        start: index + 1,
                        end: i + 3,
                        value: currentSeq
                    })
                    break;
                }

            }

            currentSeq = '';
            index = DNA.indexOf(START_CODON, index + 1);
        }
    }

    return result
    // .filter(e => e.value.length >= (min_length || MINIMUM_ORF_LENGTH));
}

const ORF = {
    findORFs,

};

module.exports = ORF;