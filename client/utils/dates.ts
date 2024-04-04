
const shortMonthFormat = new Intl.DateTimeFormat('en-US', { month: 'short' });

const twoDigitYearFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit' });

function shortMonth(date: Date) {
  return shortMonthFormat.format(date)
}

function shortYear(date: Date) {
  return twoDigitYearFormat.format(date)
}

export function parseDateForTable(val: any): Date | undefined {
  return new Date(val);
}

export function tableFormatString(date: any) {
  const parsedDate = parseDateForTable(date);
  if (!parsedDate) {
    return ''
  }
  return `${shortMonth(parsedDate)} '${shortYear(parsedDate)}`
}