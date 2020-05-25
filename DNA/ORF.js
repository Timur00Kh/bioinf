const matchAll = require('string.prototype.matchall');
matchAll.shim()

const STOP_CODONS = ["TAA", "TAG", "TGA"];
const START_CODONS = ["ATG"];
const MINIMUM_ORF_LENGTH = 10;


function findORFs(DNA, min_length) {
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
        .filter(e => e.value.length >= (min_length || MINIMUM_ORF_LENGTH));
}


const ORF = {
    findORFs,

};

module.exports = ORF;