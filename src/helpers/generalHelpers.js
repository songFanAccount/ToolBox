export function getLinear(minY, maxY, minX, maxX, curX) {
    const gradient = (maxY - minY) / (maxX - minX) // m
    const b = maxY - gradient * maxX
    return Math.min(Math.max(gradient * curX + b, minY), maxY)
}

export function degToRad(deg) { return deg * Math.PI / (180 * 1.0) }

export function copyListOfSets(list) {
    const copyList = []
    for (let i = 0; i < list.length; i++) {
        const ithSet = list[i]
        const copySet = new Set()
        for (const el of ithSet) {
            copySet.add(el)
            console.log('added ' + el)
        }
        copyList.push(copySet)
    }
    return copyList
}