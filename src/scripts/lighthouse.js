import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
const runnerResult = await lighthouse('http://localhost:3000', options);

// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

chrome.kill();
