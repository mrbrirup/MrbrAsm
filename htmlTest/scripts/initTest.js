let cfg = {
    paths: { "Mrbr": "http://127.0.0.1:5500/dist/asm/" }
};

mrbr
    .initialise(cfg)
    .then(self => {
        self.onReady()
            .then(m => {
                mrbr.loadManifest([
                    new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "Mrbr_Tests_Application", null, false, false)
                ])
                .then(result =>{
                    let container = new mrbr.entries["Mrbr_Tests_Application"]()
                })
                console.log(mrbr) ;
            })
            .catch(err => console.log(err));
    })