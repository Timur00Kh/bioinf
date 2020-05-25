const DNA = require('./DNA/DNA');
const ORF = require('./DNA/ORF');

function runTest() {
    let result = [];
    for (let i = 20; i <= 80; i++) {
        let d = DNA.buildDna(1000, i / 100);

        let ORFs = [
            ...ORF.findORFs(d, 30),
            ...ORF.findORFs(
                DNA.reverseDNA(d), 30
            )
        ];

        console.log(i + ' ' + ORFs.length);
        result.push(ORFs.length);
    }
    return result;
}

let result = {};
for (let i = 0; i < 1000; i ++) {
    for (let j = 20; j <= 80; j++) {
        let d = DNA.buildDna(1000, j / 100);

        let ORFs = [
            ...ORF.findORFs(d, 30),
            ...ORF.findORFs(
                DNA.reverseDNA(d), 30
            )
        ];

        if (!result[j]) result[j] = 0;
        result[j] += (ORFs.length ? 1 : 0);
    }

}

for (let i = 20; i <= 80; i ++) {
    console.log(i + ' ' + (result[i]));
}


