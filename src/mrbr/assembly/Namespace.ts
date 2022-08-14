export class Mrbr_Assembly_Namespace extends Map<string, any> {
    static MRBR_ASSEMBLY_NAMESPACE = Symbol("__ma_namespace__");
    static MRBR_ASSEMBLY_SIZE = Symbol("__ma_namespace__size__");
    static MRBR_ASSEMBLY_TARGET = Symbol("__ma_namespace__target__");
    static MRBR_ASSEMBLY_NAME = Symbol("__ma_namespace__name__");
    static MRBR_ASSEMBLY_PARENT = Symbol("__ma_namespace__parent__");
    static MRBR_ASSEMBLY_TO_STRING = Symbol("__ma_namespace__tostring__");
    constructor(parent: any, name: string) {
        super()
        const self = this;
        self[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT] = parent;
        self[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME] = name;
        self[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE] = true;
        return new Proxy(this, Mrbr_Assembly_Namespace.PROXY_HANDLER);
    }
    static PROXY_HANDLER: ProxyHandler<Mrbr_Assembly_Namespace> = {
        get(target: Map<string, any>, name: string | Symbol) {
            switch (name) {
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE: return target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE];
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_SIZE: return target.size;
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_TARGET: return target;
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME: return target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME];
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT: return target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT];
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_TO_STRING: {
                    let namespace = [target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME]]
                    let parent = target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT];
                    if (parent) { namespace.push(parent[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME]) }
                    while (parent) {
                        parent = parent[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT];
                        if (parent) { namespace.push(parent[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME]) }
                    }
                    return namespace.reverse().join(".");
                }
                default:
                    if (target.has(<string>name) === false) {
                        target.set(<string>name, new Mrbr_Assembly_Namespace(target, <string>name))
                    }
            }
            return (target.has(<string>name)) ? (target.get(<string>name)) : null;
        },
        set(target: Map<string, any>, name: string | Symbol, value: any) {
            switch (name) {
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE:
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_SIZE:
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_TARGET:
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME:
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_PARENT:
                case Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_TO_STRING:
                    return true
            }
            if (target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_SIZE] === 0 &&
                target[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE] === true) {
                target.set(<string>name, value);
                return true;
            }
            let namedTarget = target.get(<string>name);
            if (
                !namedTarget ||
                (namedTarget instanceof Map === false) ||
                (namedTarget instanceof Map &&
                    namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE] === false) ||
                (namedTarget instanceof Map &&
                    namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_SIZE] === 0 &&
                    namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE] === true)) {
                target.set(<string>name, value);
                return true;
            }
            if (namedTarget instanceof Map &&
                namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_SIZE] > 0 &&
                namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAMESPACE] === true) {
                throw new Error(`${namedTarget[Mrbr_Assembly_Namespace.MRBR_ASSEMBLY_NAME]} is not an empty Namespace`);
            }
            return false;
        }
    }
    static createAssembly(parent, name): Mrbr_Assembly_Namespace {
        parent[name] = new Mrbr_Assembly_Namespace(parent, name);
        return parent[name];
    }
}