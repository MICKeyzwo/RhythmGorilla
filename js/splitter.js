const splitter = {};
(_ => {
    splitter.globalizePhina = _ => new Promise((res, rej) => {
        const script = document.createElement("script");
        script.src = "http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/build/phina.js";
        document.querySelector("head").appendChild(script);
        script.addEventListener("load", () => {
            phina.globalize();
            res();
        });
        script.addEventListener("error", rej);
    });
    let prefixStr = "";
    splitter.load = src => new Promise((res, rej) => {
        if (typeof src == "string") src = [src];
        const endFlg = new Array(src.length).fill(false);
        src.forEach((s, idx) => {
            const script = document.createElement("script");
            script.src = prefixStr + s;
            document.querySelector("head").appendChild(script);
            script.addEventListener("load", _ => {
                endFlg[idx] = true;
                if (endFlg.every(v => v)) res();
            });
            script.addEventListener("error", e => rej(e));
        });
    });
    splitter.prefix = str => new Promise(res => {
        prefixStr = str;
        res();
    });
})()
