import { updateActive, walkSync } from "./library"
import { describe, it, test, expect, vi } from "vitest"
import { readdirSync, statSync, Dirent, Stats } from 'fs'
describe("updateActive", () => {
    test("updates inactive links to active based on activeStates", () => {
        const activeStates = ["ak", "ca"]
        const htmlContent = `
            <html>
                <body>
                    <a id="ak" class="inactive">Alaska</a>
                    <a id="ca" class="inactive">California</a>
                    <a id="tx" class="inactive">Texas</a>
                </body>
            </html>
        `
        const updatedHtml = updateActive(activeStates, htmlContent)
        expect(updatedHtml).toContain('<a id="ak" class="active">Alaska</a>')
        expect(updatedHtml).toContain('<a id="ca" class="active">California</a>')
        expect(updatedHtml).toContain('<a id="tx" class="inactive" href="#">Texas</a>')
    })
    test("does not modify links without id or class 'inactive'", () => {
        const activeStates = ["ak"]
        const htmlContent = `
            <html>
                <body>
                    <a class="inactive" >No ID</a>
                    <a id="ak" class="inactive">Alaska</a>
                    <a id="ny">New York</a>
                </body>
            </html>
        `
        const updatedHtml = updateActive(activeStates, htmlContent)
        expect(updatedHtml).toContain('<a id="ny">New York</a>')
    })
})
vi.mock('fs', () => ({
  readdirSync: vi.fn(),
  statSync: vi.fn(),
}))
describe("walkSync", () => {
    it("should return all subdirectories recursively", () => {
      const mockReaddirSync = vi.mocked(readdirSync)
      const mockStatSync = vi.mocked(statSync)
      mockReaddirSync.mockImplementation((dir) => {
        if (dir === "/root") {
          return [
            { name: "sub1", isDirectory: () => true } as Dirent,
            { name: "sub2", isDirectory: () => true } as Dirent,
          ]
        }
        if (dir === "/root/sub1") {
          return [
            { name: "sub1_1", isDirectory: () => true } as Dirent,
            { name: "file1", isDirectory: () => false } as Dirent,
          ]
        }
        if (dir === "/root/sub1/sub1_1") return []
        if (dir === "/root/sub2") return []
        return []
      })
      mockStatSync.mockImplementation((path) => {
        return {
          isDirectory: () => typeof path === "string" && !path.includes("file"),
        } as unknown as Stats; // Mocked object cast to Stats
      })
      const result = walkSync("/root")
      expect(result).toEqual(["/root/sub1", "/root/sub2", "/root/sub1/sub1_1"])
    })
    it("should return an empty array for an empty directory", () => {
      const mockReaddirSync = vi.mocked(readdirSync)
      mockReaddirSync.mockImplementation(() => [])
      const result = walkSync("/empty")
      expect(result).toEqual([])
    })
    it("should throw an error if the directory does not exist", () => {
      const mockReaddirSync = vi.mocked(readdirSync)
      mockReaddirSync.mockImplementation(() => {
        throw new Error("ENOENT: no such file or directory")
      })
      expect(() => walkSync("/invalid")).toThrowError("ENOENT: no such file or directory")
    })
  });