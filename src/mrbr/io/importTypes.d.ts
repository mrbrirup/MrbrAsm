declare module "text!*" {
    const textContent: string;
    export default textContent;
}

declare module "json!*" {
    const jsonValue: any;
    export default jsonValue;
}

declare module "script!*" {
    const scriptContent: any;
    export default scriptContent;
}

declare module "scriptElement!*" {
    const scriptElementValue: any;
    export default scriptElementValue;
}

declare module "scriptLink!*" {
    const scriptLinkValue: any;
    export default scriptLinkValue;
}

declare module "cssElement!*" {
    const cssElementValue: any;
    export default cssElementValue;
}

declare module "cssLink!*" {
    const cssLinkValue: any;
    export default cssLinkValue;
}

declare module "html!*" {
    const htmlValue: any;
    export default htmlValue;
}
declare module "component!*" {
    const componentValue: any;
    export default componentValue;
}
declare module "other!*" {
    const otherValue: any;
    export default otherValue;
}