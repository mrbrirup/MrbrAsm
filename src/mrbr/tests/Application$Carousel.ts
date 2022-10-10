import { Mrbr_UI_Bootstrap_Controls_Carousel } from "../ui/bootstrap/controls/Carousel";

export class Mrbr_Tests_Application$Carousel {

    constructor() {
        const ctrlType = Mrbr_UI_Bootstrap_Controls_Carousel,
            carouselItem = Mrbr_UI_Bootstrap_Controls_Carousel.CarouselItem;

        let carousel = new ctrlType("carousel1");
        carousel.initialise()
            .then(result => {
                let item1 = new carouselItem("item1", "https://picsum.photos/640/480", "An image 1", "Caption 1");
                let item2 = new carouselItem("item2", "https://picsum.photos/640/480", "An image 2", "Caption 2");
                let item3 = new carouselItem("item3", "https://picsum.photos/640/480", "An image 3", "Caption 3");
                let item4 = new carouselItem("item4", "https://picsum.photos/640/480", "An image 4", "Caption 4");
                item3.interval = 10000;
                carousel.addCarouselItems([item1, item2, item3, item4]);

                carousel.setActiveItem(item2);
                carousel.withControls = true;
                carousel.withIndicators = true;
                carousel.withCaptions = true;
                carousel.useCrossFade = true;
                carousel.autoPlay = true;
                carousel.interval = 1000;
                carousel.wrap = true;
                carousel.darkVariant = true;
                carousel.carouselItems.get("item1").captionContainer.innerHTML = "Caption 1 - changed";
                carousel.carouselItems.get("item2").captionContainer.innerHTML = "Caption 2 - changed";
                carousel.carouselItems.get("item3").captionContainer.innerHTML = "Caption 3 - changed";
                carousel.carouselItems.get("item4").captionContainer.innerHTML = "Caption 4 - changed";
                document.body.appendChild(carousel.rootElement);
                carousel.addEventListener(ctrlType.CAROUSEL_SLID_EVENT_NAME, (event) => {
                    console.log("Slid: ", (event as CustomEvent).detail);
                });
                carousel.addEventListener(ctrlType.CAROUSEL_SLIDE_EVENT_NAME, (event) => {
                    console.log("Slide: ", (event as CustomEvent).detail);
                });
            });
    }
}