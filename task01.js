const DNA = require('./DNA/DNA')
const ORF = require('./DNA/ORF')

let d = DNA.buildDna(1000, 0.5);

let ORFs = [
    ...ORF.findORFs(d),
    ...ORF.findORFs(
        DNA.reverseDNA(d)
    )
].sort((a,b) => b.value.length - a.value.length);

if (ORFs.length) {
    console.log(`Максимальная ORF: ${ORFs[0].value}`)
} else {
    console.log(`ORF не найдена`)
}

