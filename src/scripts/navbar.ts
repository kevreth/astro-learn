export function splitArray<T>(items: T[]): [T[], T[]] {
    const n = items.length
    if ( n >= 9) throw new Error("Invalid number of items")
    const firstSize = n < 5 ? n : Math.ceil(n / 2)
    return [items.slice(0, firstSize), items.slice(firstSize)]
}
