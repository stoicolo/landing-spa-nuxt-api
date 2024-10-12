const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

function parseAndFormatDate(dateString) {
  const parsedDate = dayjs(dateString, 'DD-MM-YYYY HH:mm');
  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format');
  }
  return parsedDate.format('YYYY-MM-DD');
}

module.exports = { parseAndFormatDate };
