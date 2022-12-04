import { Mrbr_UI_Bootstrap_Controls_Card } from "../ui/bootstrap/controls/Card";

export class Mrbr_Tests_Application$Card {

    constructor() {
        const cardType = Mrbr_UI_Bootstrap_Controls_Card;

        let card2 = new cardType("card2", cardType.cardStyles.vertical, new cardType.ImageCardProperties("https://picsum.photos/100/50", "An image"));
        card2.imageLocation = cardType.imageLocations.top;
        card2.initialise()
            .then(result => {
                let text2 = card2.createText("text1", "Card 2 Text");
                let header2 = card2.createHeader("header1", "Card 2 Header");
                let body2 = card2.elements.get(cardType.CARD_BODY_NAME);

                card2.defaultContainerElement.appendChild(header2);
                body2.appendChild(text2);
                card2.defaultContainerElement.appendChild(body2);
                card2.mount(document.body);
                card2.rootElement.classList.add("m-3");
            })

        let card3 = new cardType("card3", cardType.cardStyles.horizontal, new cardType.HorizontalCardStyle(cardType.HorizontalImageSize.i4_8, cardType.HorizontalImageSplit.md, "https://picsum.photos/640/480", "An image"));
        card3.initialise()
            .then(result => {
                let text3 = card3.createText("text1", "Card 3 Text");
                let header3 = card3.createHeader("header1", "Card 3 Header");
                let footer3 = card3.createFooter("footer1", "Card 3 Footer");
                let body3 = card3.elements.get(cardType.CARD_BODY_NAME);
                card3.rootElement.prepend(header3);
                body3.appendChild(text3);
                card3.rootElement.lastChild.after(footer3);
                card3.mount(document.body);
                card3.rootElement.classList.add("m-3");
            });

        let card1 = new cardType("card4", cardType.cardStyles.overlay, new cardType.ImageCardProperties("https://picsum.photos/100/50", "An image"));
        card1.initialise()
            .then(result => {
                let text1 = card1.createText("text1", "Card Text 1");
                let header1 = card1.createHeader("header1", "Card Header 1");
                let body1 = card1.elements.get(cardType.CARD_BODY_NAME);
                body1.prepend(header1);
                body1.appendChild(text1);
                text1.classList.add("p-3");
                card1.classes(card1.rootElement, card1.$clsActions.add, "text-bg-primary");
                card1.mount(document.body);
                card1.rootElement.classList.add("m-3");
            })
    }
}