const fs = require("fs-extra");
const path = require("path");
const logger = require("../../utils/logger");
const { generateReport } = require("../../light-house");

module.exports = async (url, data) => {
  try {
    const report = await generateReport(url, data);
    const date = new Date();
    const outputPath = path.join(
      __dirname,
      "../../../reports",
      url.replace(/(^\w+:|^)\/\//, ""),
      `${date.toISOString()}.html`
    );
    await fs.outputFile(outputPath, report);
    return outputPath.substring(outputPath.indexOf("reports"), outputPath.length);
  } catch (err) {
    logger.error(`Failed to generate report for ${url}`, err);
    return Promise.reject("Failed to generate report");
  }
};
