function cycleDFS(g, curVertex, curTraversal) {
	console.log(curTraversal)
	if (curTraversal.includes(curVertex)) return curTraversal.slice(curTraversal.indexOf(curVertex)) // Cycle found, return this element
	curTraversal.push(curVertex)
  const possibleNextVs = g[curVertex] // Array of vertices that there is a direct edge from curVertex
	for (const v of possibleNextVs) {
		const result = cycleDFS(g, v, curTraversal)
		if (result) return result
		else curTraversal.pop()
	}
	return null
}

export function findCycle(g) {
	// Finds and returns a cycle in the form of a list of edges, or NULL if no cycles
	const vertices = Object.keys(g)
	for (const v of vertices) {
		const curTraversal = []
		const result = cycleDFS(g, v, curTraversal)
		if (result) return result
	}
	return null
}