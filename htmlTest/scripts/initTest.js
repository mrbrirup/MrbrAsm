let cfg = {
    // paths: { "Mrbr": "http://127.0.0.1:5500/dist/mrbr/" }
    paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" }
};
function runRes(result) {
    try {
        MrbrBase.mrbrInstance.loadManifest(Mrbr.Tests.Application$Dropdown[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(_ => {

                let DropdownApplication = new Mrbr.Tests.Application$Dropdown()
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
                Mrbr.IO.File.component(Mrbr.Tests.Application$Dropdown, 0),
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
}
