export function Mrbr_System_Chrono_DateTime$Difference (startDate: Date, endDate: Date) {
    const fn = Mrbr_System_Chrono_DateTime$Difference;
    if (!fn.prototype._years) {
        fn.prototype._years = new Map();
        fn.prototype._yearInfo = function (months) {
            this.days = months.reduce((a, b) => a + b, 0);
            this.months = months;
            this.seconds = () => this.months.length * 86400;
        };
        fn.prototype._getYearsInfo = function (year) {
            const years = fn.prototype._years;
            (!years.has(year)) && years.set(year, new fn.prototype._yearInfo([...Array(12).keys()].map(month => new Date(year, month + 1, 0).getDate())))
            return years.get(year);
        }
        fn.prototype._yearsArray = (startYear, endYear) => [...Array(endYear - startYear - 1).keys()].map(year => startYear + year);
    }
    const
        fnProto = fn.prototype,
        actualStart = startDate < endDate ? startDate : endDate,
        actualEnd = startDate < endDate ? endDate : startDate,
        startMonth = actualStart.getMonth() + 1,
        endMonth = actualEnd.getMonth() + 1,
        startYear = actualStart.getFullYear(),
        endYear = actualEnd.getFullYear(),
        startDay = actualStart.getDate(),
        endDay = actualEnd.getDate(),
        multiplier = ((startDate > endDate) ? -1 : 1);
    if (startYear === endYear && startMonth === endMonth) { return endDay - startDay + 1 * multiplier; }
    const
        getYearsInfo = fnProto._getYearsInfo,
        yearInfo = getYearsInfo(startYear),
        yearMonths = yearInfo.months;
    if (startYear === endYear) {
        return (yearMonths[startMonth - 1] - startDay + endDay + yearMonths.filter((_, index) => index > startMonth - 1 && index < endMonth - 1).reduce((total, days) => total + days, 0)) * multiplier
    }
    return (yearMonths[startMonth - 1] - startDay + yearMonths.filter((value, index) => index > startMonth - 1).reduce((total, days) => total + days, 0) +
        fnProto._yearsArray(startYear, endYear).reduce((total, year) => total += getYearsInfo(year).days, 0)
        + getYearsInfo(endYear).months.filter((_, index) => index < endMonth - 1).reduce((total, days) => total + days, 0) + endDay)
        * multiplier
}