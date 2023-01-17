import { Mrbr_UI_Bootstrap_Form_Date } from "../ui/bootstrap/form/date";

export class Mrbr_Tests_Application$Date {
    constructor() {
        const mrbrDate = Mrbr_UI_Bootstrap_Form_Date,
            date = new mrbrDate();
        date.initialise()
            .then(() => {
                date
                    .Label("Date")
                    .mount(document.body);
            })
            .catch((error) => {
                console.error(error);
            });

    }
}