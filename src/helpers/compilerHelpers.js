export function preProcessCode(code) {
    console.log("Pre-processing")
    console.log('Input code =')
    console.log(code)
    console.log('Remove tabs')
    code = code.replaceAll('\t', '')
    console.log(code)
    const lines = code.split(/\r?\n/)
    console.log('Split by \\n into lines')
    console.log(lines)
    console.log('For each line, trim the start and end of whitespaces')
   lines.forEach((value, index) => {
        lines[index] = value.trimStart().trimEnd()
    })
    console.log(lines)
    return lines
}