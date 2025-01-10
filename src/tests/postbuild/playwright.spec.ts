import { test as base } from '@playwright/test'
import { expect, type Page } from '@playwright/test'
import { PORT } from './server'
/***
 * The lack of breaking up the tests into smaller tests is intentional.
 * This is to ensure that the tests are run in parallel and 
 * because this is meant to be part of the build process and
 * must be speedy.
 */
const BASE_URL = `http://localhost:${PORT}`
const GAP = 5
const GAP_TOLERANCE = 2
function getHorizontalGap(left: { x: number; y: number; width: number; height: number }, right: { x: number; y: number; width: number; height: number }) {
    return Math.abs(right.x - left.x - left.width)
}
function getVerticalGap(top: { x: number; y: number; width: number; height: number }, bottom: { x: number; y: number; width: number; height: number }) {
    return Math.abs(bottom.y - top.y - top.height)
}
async function gapTest(page: Page, element1: string, element2: string, gapFunction: { (rect1: DOMRect, rect2: DOMRect): number; (rect1: DOMRect, rect2: DOMRect): number; (arg0: any, arg1: any): any }){
    const left = await page.locator(element1).boundingBox()
    const right = await page.locator(element2).boundingBox()
    if (left && right) {
        const gap = gapFunction(left, right)
        //Need slight tolerance due to rounding of the gap calculation
        expect(gap).toBeGreaterThan(GAP - GAP_TOLERANCE)
        expect(gap).toBeLessThan(GAP + GAP_TOLERANCE)
    } else {
        throw new Error('One of the elements is null')
    }
}
//for speed, block all external network requests
type Fixtures = {
    page: Page
  }
  const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
      await page.route('**/*', (route) => {
        const url = route.request().url()
        if (url.startsWith('http://localhost')) {
          route.continue()
        } else {
          route.abort()
        }
      })
      await use(page)
    },
  })
test.describe.parallel('home', async () => {
    test.describe.parallel('test gaps', async () => {
    })
    test('', async ({ page }) => {
        const testCases: [string, string, (rect1: DOMRect, rect2: DOMRect) => number][] = [
            ['header','h1', getVerticalGap],
            ['.logo', '#main-wrapper', getHorizontalGap],
            ['h1', '.text-content', getVerticalGap],
        ]
        const SLUG = ''
        const URL = `${BASE_URL}/${SLUG}`
        await page.goto(URL)
        // await Promise.all(testCases.map(([element1, element2, gapFunction]) => gapTest(page, element1, element2, gapFunction)))
        const selector = 'div.label'
        await page.goto(URL)
        await page.locator(selector, { hasText: 'United States' }).click()
    })
})
test.describe.parallel('country', async () => {
    test('', async ({ page }) => {
        const SLUG = 'us/'
        const URL = `${BASE_URL}/${SLUG}`
        let selector = 'a.active#ca'
        await page.goto(URL)
        await page.locator(selector, { hasText: 'CA' }).click()
        selector = 'ol.breadcrumb'
        await page.goto(URL)
        let locator = page.locator(selector)
        await expect(locator).toBeVisible()
        selector = 'ol.breadcrumb li.breadcrumb-item'
        locator = page.locator(selector)
        await expect(locator).toHaveCount(2)
        await expect(locator.nth(0)).toBeVisible()
        await expect(locator.nth(1)).toBeVisible()
        await expect(locator.nth(0)).toContainText('Inquirita')
        await expect(locator.nth(1)).toContainText('USA')
})
})
test.describe.parallel('region', async () => {
    test('', async ({ page }) => {
        const SLUG = 'us/ca/'
        const URL = `${BASE_URL}/${SLUG}`
        const selector = 'a.active#covina'
        await page.goto(URL)
        await page.locator(selector, { hasText: 'Covina' }).click()
    })
})
test.describe.parallel('locality', async () => {
    test('', async ({ page }) => {
        const SLUG = 'us/ca/covina/'
        const URL = `${BASE_URL}/${SLUG}`
        await page.goto(URL)
        await page.getByRole('link', { name: 'HVAC' }).click()
    })
})
test.describe.parallel('niche', async () => {
    test('', async ({ page }) => {
        const SLUG = 'us/ca/covina/hvac/'
        const URL = `${BASE_URL}/${SLUG}`
        let selector = '.breadcrumb-item:last-child'
        await page.goto(URL)
        const locator = page.locator(selector)
        await expect(locator).not.toHaveAttribute('href')
        selector = 'a[href="/us/ca/covina/hvac/directory"]'
        await page.goto(URL)
        await page.locator(selector).click()
    })
})
test.describe.parallel('directory', async () => {
    test('', async ({ page }) => {
        const SLUG = 'us/ca/covina/hvac/directory/'
        const URL = `${BASE_URL}/${SLUG}`
        let selector = '.toggle-container .label-span .label-div'
        await page.goto(URL)
        let locator = page.locator(selector)
        // await expect(locator).toBeVisible()
        // await expect(locator).toHaveText('Websites only')
        // await expect(locator).toHaveCSS('position', 'relative')
        selector = '.toggle-container .label-span .fas.fa-info-circle'
        locator = page.locator(selector)
        // await expect(locator).toHaveCSS('position', 'relative')
        // await expect(locator).toHaveCSS('top', '-6px')
        // await expect(locator).toHaveCSS('cursor', 'pointer')
        selector = '.toggle-container'
        locator = page.locator(selector)
        // await expect(locator).toHaveCSS('display', 'flex')
        // await expect(locator).toHaveCSS('align-items', 'center')
        // await expect(locator).toHaveCSS('justify-content', 'flex-start')
        // await expect(locator).toHaveCSS('position', 'absolute')
        // selector = '.toggle-container .switch'
        // locator = page.locator(selector)
        // // await expect(locator).toBeVisible()
        // selector = '.toggle-container .switch .toggle-switch'
        // locator = page.locator(selector)
        // await expect(locator).toHaveAttribute('id', 'toggleSwitch')
        // await expect(locator).toHaveCSS('cursor', 'pointer')
        // selector = '.toggle-container .switch'
        // locator = page.locator(selector)
        // await expect(locator).toBeVisible()
        // selector = '.toggle-container .label-span'
        // locator = page.locator(selector)
        // await expect(locator).toBeVisible()
        selector = '.breadcrumb-item:last-child'
        locator = page.locator(selector)
        await expect(locator).not.toHaveAttribute('href')
        selector = '#static-table th'
        locator = page.locator(selector)
        await expect(locator).toHaveCount(5)
        const testCases: [string, string, (rect1: DOMRect, rect2: DOMRect) => number][] = [
            ['header','.breadcrumb-container', getVerticalGap],
            ['.breadcrumb-container','h1', getVerticalGap],
            ['.logo', '#main-wrapper', getHorizontalGap],
            ['h1', '#dynamic-table', getVerticalGap],
        ]
        // await Promise.all(testCases.map(([element1, element2, gapFunction]) => gapTest(page, element1, element2, gapFunction)))
    })
})
