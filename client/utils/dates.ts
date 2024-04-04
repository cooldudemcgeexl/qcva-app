
const shortMonthFormat = new Intl.DateTimeFormat('en-US', { month: 'short' }).format;

const twoDigitYearFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit' }).format;

const usDateFormat = new Intl.DateTimeFormat('en-US').format

export function parseDateForTable(val: any): Date | undefined {
  return new Date(val);
}

export function tableFormatString(date: any) {
  const parsedDate = parseDateForTable(date);
  if (!parsedDate) {
    return ''
  }
  return `${shortMonthFormat(parsedDate)} '${twoDigitYearFormat(parsedDate)}`
}

export function longTableFormatString(date: any) {
  const parsedDate = parseDateForTable(date);
  if (!parsedDate) {
    return ''
  }
  return usDateFormat(parsedDate)

}