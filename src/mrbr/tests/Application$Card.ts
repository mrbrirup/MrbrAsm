import { Mrbr_UI_Bootstrap_Controls_Card } from "../ui/bootstrap/controls/Card";

export class Mrbr_Tests_Application$Card {

    constructor() {
        const cType = Mrbr_UI_Bootstrap_Controls_Card;
        //const card = new cType("card1");
        //card.initialise()
        //  .then(result => {
        // let text = card.createText("text1", "Some Text");
        // let header = card.createHeader("header1", "Some Header");
        // //let body1 = card.createBody("body1");
        // let image = card.createImage("image1", cType.imageLocations.TOP, "https://picsum.photos/100/50", "An image");
        // let body1 = card.elements[cType.CARD_BODY_NAME];

        // body1.appendChild(text);
        // card.rootElement.prepend(header);
        // header.after(image);

        // document.body.appendChild(card.rootElement);

        // let card2 = new cType("card2", cType.cardStyles.VERTICAL, new cType.ImageCardProperties("https://picsum.photos/100/50", "An image"));
        // card2.imageLocation = cType.imageLocations.TOP;
        // card2.initialise()
        //     .then(result => {
        //         let text1 = card2.createText("text1", "Some Text");
        //         let header1 = card2.createHeader("header1", "Some Header");
        //         let body1 = card2.elements[cType.CARD_BODY_NAME];

        //         body1.appendChild(text1);
        //         //card2.rootElement.firstChild.before(header1);

        //         document.body.appendChild(card2.rootElement);
        //     })

        // let card3 = new cType("card3", cType.cardStyles.HORIZONTAL, new cType.HorizontalCardStyle(cType.HorizontalImageSize.i4_8, cType.HorizontalImageSplit.md, "https://picsum.photos/640/480", "An image"));
        // card3.initialise()
        //     .then(result => {
        //         let text1 = card3.createText("text1", "Some Text");
        //         let header1 = card3.createHeader("header1", "Some Header");
        //         let footer1 = card3.createFooter("footer1", "Some Footer");
        //         let body1 = card3.elements[cType.CARD_BODY_NAME];

        //         body1.appendChild(text1);
        //         card3.rootElement.firstChild.before(header1);
        //         card3.rootElement.lastChild.after(footer1);

        //         document.body.appendChild(card3.rootElement);
        //     }
        //     );

        //let card4 = new cType("card4", cType.cardStyles.OVERLAY,  new cType.HorizontalCardStyle(cType.HorizontalImageSize.i4_8, cType.HorizontalImageSplit.md, "https://picsum.photos/640/480", "An image"));
        let card4 = new cType("card4", cType.cardStyles.OVERLAY, new cType.ImageCardProperties("https://picsum.photos/100/50", "An image"));
        card4.initialise()
            .then(result => {
                let text4 = card4.createText("text1", "Some Text");
                let header4 = card4.createHeader("header1", "Some Header");
                let body4 = card4.elements[cType.CARD_BODY_NAME];
                body4.appendChild(text4);
                card4.classes(card4.rootElement, card4.$clsActions.Add, "text-bg-primary");
                document.body.appendChild(card4.rootElement);
            })

        //})

    }
}