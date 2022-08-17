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
            Mrbr.IO.File.component("Mrbr_Tests_Application"),
            Mrbr.IO.File.component("Mrbr_System_MrbrBase"),
            new Mrbr.IO.File(Mrbr.IO.FileType.ScriptLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js", {
                integrity: "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
                crossorigin: "anonymous"
            }),

            new Mrbr.IO.File(Mrbr.IO.FileType.CssLink, null, "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css", "css", {
                integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
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