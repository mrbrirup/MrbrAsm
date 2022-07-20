let cfg = {
    paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" }
};
function runRes(result) {
    let container = new mrbr.entries["Mrbr_Tests_Application"]()
    let manifest = [new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptElement, "Mrbr", "http://127.0.0.1:5500/htmlTest/scripts/test1.js", null, false, false)]
    mrbr.loadManifest(manifest)
        .then(r => console.log(r))
        .catch(r => console.log(r))
}

mrbr
    .initialise(cfg)
    .then(self => {
        self.onReady()
            .then(m => {
                onReady();
            })
            .catch(err => console.log(err));
    })
function onReady() {
    try {
        mrbr.loadManifest([
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "Mrbr_Tests_Application", null, false, false),
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptLink, "Mrbr", "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js", null, false, false, {
                integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
                crossorigin: "anonymous"
            })
        ])
            .then(result => {runRes(result);})
            .catch(err => {console.log(err)});
    } catch (error) {
        console.log(error);
    }

}