let cfg = {
    paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" }
};
function runRes(result) {
    try {
        let container = new mrbr.entries["Mrbr_Tests_Application"]()
    } catch (error) {
        console.log(error)
    }
    // let manifest = new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptElement, "Mrbr", "http://127.0.0.1:5500/htmlTest/scripts/test1.js", null, false, false)
    // mrbr.loadManifest(manifest)
    //     .then(r => {})
    //     .catch(r => console.log(r))
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
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, null, "Mrbr_Tests_Application", null, false, false),
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js", null, false, false, {
                integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
                crossorigin: "anonymous"
            }),

            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css", null, false, false, {
                integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
                crossorigin: "anonymous"
            })
            /*
            ,

            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Script, null, "http://127.0.0.1:5500/htmlTest/scripts/alter.js", null, false, false),
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptElement, null, "http://127.0.0.1:5500/htmlTest/scripts/altercopy.js", null, false, false),
            new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].ScriptLink, null, "http://127.0.0.1:5500/htmlTest/scripts/altercopy2.js", null, false, false),
            */
        ])
            .then(result => { runRes(result); })
            .catch(err => { console.log(err) });
    } catch (error) {
        console.log(error);
    }

}