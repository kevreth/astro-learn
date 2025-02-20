import { describe, expect, it } from "vitest"
import { splitArray } from "./navbar"

describe("splitArray", () => {
  it("throws an error for 0 items", () => {
    expect(() => splitArray([])).toThrow("Invalid number of items")
  })

  it("throws an error for 9 or more items", () => {
    expect(() => splitArray(["a", "b", "c", "d", "e", "f", "g", "h", "i"])).toThrow("Invalid number of items")
  })

  it("splits 1 item as [['a'],[]]", () => {
    expect(splitArray(["a"])).toEqual([["a"], []])
  })

  it("splits 2 items as [['a','b'],[]]", () => {
    expect(splitArray(["a", "b"])).toEqual([["a", "b"], []])
  })

  it("splits 3 items as [['a','b','c'],[]]", () => {
    expect(splitArray(["a", "b", "c"])).toEqual([["a", "b", "c"], []])
  })

  it("splits 4 items as [['a','b','c','d'],[]]", () => {
    expect(splitArray(["a", "b", "c", "d"])).toEqual([["a", "b", "c", "d"], []])
  })

  it("splits 5 items as [['a','b','c'],['d','e']]", () => {
    expect(splitArray(["a", "b", "c", "d", "e"])).toEqual([["a", "b", "c"], ["d", "e"]])
  })

  it("splits 6 items as [['a','b','c'],['d','e','f']]", () => {
    expect(splitArray(["a", "b", "c", "d", "e", "f"])).toEqual([["a", "b", "c"], ["d", "e", "f"]])
  })

  it("splits 7 items as [['a','b','c','d'],['e','f','g']]", () => {
    expect(splitArray(["a", "b", "c", "d", "e", "f", "g"])).toEqual([["a", "b", "c", "d"], ["e", "f", "g"]])
  })

  it("splits 8 items as [['a','b','c','d'],['e','f','g','h']]", () => {
    expect(splitArray(["a", "b", "c", "d", "e", "f", "g", "h"])).toEqual([["a", "b", "c", "d"], ["e", "f", "g", "h"]])
  })
})
