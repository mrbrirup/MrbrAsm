const cfg = { paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" } };
function runRes(result) {
    try {
        mrbr.loadManifest(Mrbr.Tests.Application$Container[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(async _ => {
                let containerApplication = new Mrbr.Tests.Application$Container();
                await containerApplication.initialise(document.body)
                    .then(_ => {

                    });

            })
    } catch (error) {
        console.log(error)
    }
}
mrbr
    .initialise(cfg)
    .then(async _mrbr => {
        await _mrbr.onReady()
        onReady();
    })
async function onReady() {
    const manifest =
        [
            Mrbr.IO.File.component(Mrbr.Tests.Application$Container, 0),
            new Mrbr.IO.File(Mrbr.IO.FileType.ScriptLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js", "", {
                integrity: "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
                crossorigin: "anonymous"
            }),
            new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css", "css", {
                integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
                crossorigin: "anonymous"
            }),
            new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css", "css")
        ];
    try {
        const result = await mrbr.loadManifest(manifest)
            .catch(err => console.warn(err.message))
        runRes(result);
    } catch (error) {
        console.log(error)
    }
}