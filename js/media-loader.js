const mediaLoader = (_ => {
    const Video = function () {
        return document.createElement("video");
    };
    let prefixStr = "";
    const loadSingle = (src, T) => new Promise((res, rej) => {
        const data = new T();
        const loadFlg = T == Image ? "load" : "loadstart";
        data.addEventListener(loadFlg, _ => res(data));
        data.addEventListener("error", _ => rej(new Error("media loading failed!")));
        data.src = prefixStr + src;
    });
    const loadMulti = (srcs, T) => {
        const promises = [];
        const keys = Object.keys(srcs);
        keys.forEach(key => promises.push(loadSingle(srcs[key], T)));
        return new Promise((res, rej) => {
            Promise.all(promises).then(arr => {
                res(arr.reduce((obj, val, idx) => {
                    obj[keys[idx]] = val;
                    return obj;
                }, Array.isArray(srcs) ? [] : {}));
            }).catch(_ => {
                rej(new Error("media loading failed!"));
            });
        });
    };
    const switcher = (src, T) => {
        if (typeof src == "string") return loadSingle(src, T);
        if (typeof src == "object") return loadMulti(src, T);
    };
    return {
        prefix: async str => {
            if (!str) return prefixStr;
            prefixStr = str;
            return prefixStr;
        },
        loadImage: src => switcher(src, Image),
        loadAudio: src => switcher(src, Audio),
        loadVideo: src => switcher(src, Video),
        loadMedia: obj => {
            const promises = [];
            const keys = ["image", "audio", "video"];
            keys.forEach(key => {
                if (obj[key])
                    promises.push(switcher(obj[key], key == "image" ? Image : key == "audio" ? Audio : Video));
                else
                    promises.push(null);
            });
            return new Promise((res, rej) => {
                Promise.all(promises).then(arr => {
                    res(arr.reduce((obj, val, idx) => {
                        obj[keys[idx]] = val;
                        return obj;
                    }, Array.isArray(srcs) ? [] : {}));
                }).catch(_ => {
                    rej(new Error("media loading failed!"));
                });
            });
        }
    };
})();
