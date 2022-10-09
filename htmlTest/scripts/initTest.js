let cfg = {
    // paths: { "Mrbr": "http://127.0.0.1:5500/dist/mrbr/" }
    paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" }
};
function runRes(result) {
    try {
        MrbrBase.mrbrInstance.loadManifest(Mrbr.Tests.Application$Card[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(_ => {

                let buttonApplication = new Mrbr.Tests.Application$Card()
            })

    } catch (error) {
        console.log(error)
    }
}
mrbr.addEventListener("loadComponent", (event) => {
    console.log("loadComponent: ", event.details);
});
mrbr
    .initialise(cfg)
    .then(async self => {
        await self.onReady()
        onReady();
    })
async function onReady() {
    try {
        window["mrbrLoadManifest"] =
            [
                Mrbr.IO.File.component(Mrbr.Tests.Application$Card, 0),
                new Mrbr.IO.File(Mrbr.IO.FileType.ScriptLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js", "", {
                    integrity: "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
                    crossorigin: "anonymous"
                }),
                new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css", "css", {
                    integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
                    crossorigin: "anonymous"
                })
            ];
        const result = await mrbr.loadManifest(window.mrbrLoadManifest)
            .catch(err => console.warn(err.message))
        result && runRes(result);
    } catch (error) {
        console.log(error);
    }

    //let _dateDiff = dateDif();
    const startDate1 = new Date(new Date().getFullYear(), 0, 1),
        endDate1 = new Date();

    //console.log(dateDif(startDate1, endDate1));
    let d1 = new Date(2022, 0, 1), 
        d2 = new Date();
        seconds = (d2 - d1).toString(16);
    console.log(dateDif(d1,d2));
    console.log(seconds);
    console.log(Date.now())

    // console.log(dateDif(new Date(2022, 9, 8), new Date(1970, 0, 1)));
    // console.log(dateDif(new Date(1970, 0, 1), new Date(1970, 11, 31)));
    // console.log(dateDif(new Date(1970, 11, 31), new Date(1970, 0, 1)));
    // console.log(dateDif(new Date(2022, 0, 1), new Date(2022, 9, 8)));
    // console.log(dateDif(new Date(2022, 9, 8), new Date(2022, 0, 1)));


    function dateDif(startDate, endDate) {
        if (!dateDif.prototype._years) {
            dateDif.prototype._years = new Map();
            dateDif.prototype._yearInfo = function (months) {
                this.days = months.reduce((a, b) => a + b, 0);
                this.months = months;
                this.seconds = () => this.months.length * 86400;                
            };
            dateDif.prototype._getYearsInfo = function (year) {
                const years = dateDif.prototype._years;
                (!years.has(year)) && years.set(year, new dateDif.prototype._yearInfo([...Array(12).keys()].map(month => new Date(year, month + 1, 0).getDate())))
                return years.get(year);
            }
            dateDif.prototype._yearsArray = (startYear, endYear) => [...Array(endYear - startYear - 1).keys()].map(year => startYear + year);
        }
        const
            fnProto = dateDif.prototype,
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
            + getYearsInfo(endYear).months.filter((_, index) => index < endMonth - 1).reduce((a, b) => a + b, 0) + endDay)
            * multiplier
    }
}
