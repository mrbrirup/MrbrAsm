import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";

export class Mrbr_UI_Bootstrap_Controls_Modal extends Mrbr_UI_Controls_Control {

    public static readonly MODAL_NAME: string = "modal";
    public static readonly MODAL_DIALOG_NAME: string = "modal_dialog";
    public static readonly MODAL_CONTENT_NAME: string = "modal_content";
    public static readonly MODAL_HEADER_NAME: string = "modal_header";
    public static readonly MODAL_BODY_NAME: string = "modal_body";
    public static readonly MODAL_FOOTER_NAME: string = "modal_footer";
    public static readonly MODAL_TITLE_NAME: string = "modal_titlebar";
    //public static readonly MODAL_TITLE_NAME: string = "modal_title";
    public static readonly MODAL_CLOSE_BUTTON_NAME: string = "modal_close_button";


    private _dialogTitleText: string;
    public get dialogTitleText(): string { return this._dialogTitleText; }
    public set dialogTitleText(value: string) { this._dialogTitleText = value; }
    private _header: boolean = true;
    private _footer: boolean = true;
    private _title: boolean = true;
    private _closeButton: boolean = false;


    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Modal { return Mrbr_UI_Bootstrap_Controls_Modal; }

    constructor(rootElementName: string) {
        super(rootElementName);
    }

    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>("Modal:initialise");
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfig();
                const
                    modelLabelId = self.$cls.createId("modalLabel"),
                    modalFooter = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_FOOTER_NAME, "div", self.configuration(self.$cls.MODAL_FOOTER_NAME))
                        .Properties({ innerText: "Footer" }),
                    ),
                    modalBody = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_BODY_NAME, "div", self.configuration(self.$cls.MODAL_BODY_NAME))
                        .Properties({ innerText: "..." })
                    ),
                    closeButton = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_CLOSE_BUTTON_NAME, "div", self.configuration(self.$cls.MODAL_CLOSE_BUTTON_NAME))),
                    modalTitleBar = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_TITLE_NAME, "h1", self.configuration(self.$cls.MODAL_TITLE_NAME))
                        .Id(modelLabelId)
                        .Properties({ innerText: self.dialogTitleText })

                    ),
                    modalHeader = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_HEADER_NAME, "div", self.configuration(self.$cls.MODAL_HEADER_NAME))
                        .Children([modalTitleBar, closeButton])
                    );
                const
                    modalContent = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_CONTENT_NAME, "div", self.configuration(self.$cls.MODAL_CONTENT_NAME))
                        .Children([modalHeader, modalBody, modalFooter])
                    ),
                    modalDialog = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_DIALOG_NAME, "div", self.configuration(self.$cls.MODAL_DIALOG_NAME))
                        .Children([modalContent]),
                    ),
                    modal = self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.MODAL_NAME))
                        .Aria({ "labelledby": `#${modelLabelId}`, hidden: true })
                        .Children([modalDialog])
                        //.Data({ bsBackdrop: "static", bsKeyboard: false })
                    );

                initalisePromise.resolve(self);
            })
            .catch(error => {
                initalisePromise.reject(error);
            });
        return initalisePromise;
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>("Modal:setDefaultConfig");
        super.setDefaultConfig()
            .then(_ => {

                !self.hasConfiguration(self.$cls.MODAL_NAME) && self.defaultConfig.add(self.$cls.MODAL_NAME, new self.$ctrlPrm()
                    .Classes("modal")
                    .Properties({ tabIndex: -1 }));
                !self.hasConfiguration(self.$cls.MODAL_DIALOG_NAME) && self.defaultConfig.add(self.$cls.MODAL_DIALOG_NAME, new self.$ctrlPrm()
                    .Classes("modal-dialog"));
                !self.hasConfiguration(self.$cls.MODAL_CONTENT_NAME) && self.defaultConfig.add(self.$cls.MODAL_CONTENT_NAME, new self.$ctrlPrm()
                    .Classes("modal-content"));
                !self.hasConfiguration(self.$cls.MODAL_HEADER_NAME) && self.defaultConfig.add(self.$cls.MODAL_HEADER_NAME, new self.$ctrlPrm()
                    .Classes("modal-header"));
                !self.hasConfiguration(self.$cls.MODAL_BODY_NAME) && self.defaultConfig.add(self.$cls.MODAL_BODY_NAME, new self.$ctrlPrm()
                    .Classes("modal-body"));
                !self.hasConfiguration(self.$cls.MODAL_FOOTER_NAME) && self.defaultConfig.add(self.$cls.MODAL_FOOTER_NAME, new self.$ctrlPrm()
                    .Classes("modal-footer"));
                !self.hasConfiguration(self.$cls.MODAL_TITLE_NAME) && self.defaultConfig.add(self.$cls.MODAL_TITLE_NAME, new self.$ctrlPrm()
                    .Classes("modal-title fs-5"));
                !self.hasConfiguration(self.$cls.MODAL_CLOSE_BUTTON_NAME) && self.defaultConfig.add(self.$cls.MODAL_CLOSE_BUTTON_NAME, new self.$ctrlPrm()
                    .Classes("btn-close")
                    .Data({ bsDismiss: "modal" })
                    .Properties({ type: "button" })
                    .Aria({ label: "Close" })
                );

                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => {
                setDefaultConfigPromise.reject(error);
            });
        return setDefaultConfigPromise;
    }
}