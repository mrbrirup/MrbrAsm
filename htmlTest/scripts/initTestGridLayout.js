function runRes(result) {
    try {
        MrbrBase.mrbrInstance.loadManifest(Mrbr.Tests.Application$GridLayout[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(_ => {

                let DropdownApplication = new Mrbr.Tests.Application$GridLayout()
            })

    } catch (error) {
        console.log(error)
    }
}
mrbr.addEventListener("loadComponent", (event) => {
    console.log("loadComponent: ", event.details);
});
mrbr
    .Paths({
        "Mrbr": window.location.origin + "/dist/asm/"
    })
    .initialise()
    .then(async self => {
        await self.onReady()
        onReady();
    })
async function onReady() {
    try {
        window["mrbrLoadManifest"] =
            [
                Mrbr.IO.File.component(Mrbr.Tests.Application$GridLayout, 0),
                //Mrbr.IO.File.component(Mrbr.UI.Controls.Control, 0),
                new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", "", {
                    integrity: "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65",
                    crossorigin: "anonymous"
                }),
                new Mrbr.IO.File(Mrbr.IO.FileType.ScriptLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js", "css", {
                    integrity: "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4",
                    crossorigin: "anonymous"
                }),
                new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css", "css")
            ];
        const result = await mrbr.loadManifest(window.mrbrLoadManifest)
            .catch(err => console.warn(err.message))
        result && runRes(result);
    } catch (error) {
        console.log(error);
    }
}
