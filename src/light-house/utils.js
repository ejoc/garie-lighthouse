const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const ReportGenerator = require("lighthouse/lighthouse-core/report/report-generator");

const chromeFlags = ["--no-zygote", "--no-sandbox", "--headless"];

const launchChromeAndRunLighthouse = async (url, config) => {
  const chrome = await chromeLauncher.launch({ chromeFlags });

  const flags = {
    port: chrome.port,
    output: "json"
  };

  const result = await lighthouse(url, flags, config);
  await chrome.kill();

  return result;
};

const createReport = results => ReportGenerator.generateReportHtml(results);

module.exports = {
  launchChromeAndRunLighthouse,
  createReport
};
