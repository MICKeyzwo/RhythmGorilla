const scoreManager = (_ => {

    "use strict";

    const scores = [];
    const cache = {};
    const add = json => scores.push(json);

    const parseScore = json => {
        const result = [];
        const score = json.score;
        let bpm = json.bpm;
        const m = json.measure.split("/");
        let measure = 48 * (+m[0] / +m[1]);
        let now = json.delay;
        let def = 60000 / bpm / 12;
        score.forEach(bar => {
            let res = "";
            const len = bar.length;
            [...bar].forEach(token => {
                res += token;
                res += "0".repeat(measure / len - 1);
            });
            [...res].forEach(token => {
                if (token != 0) {
                    result.push({type: token, time: now});
                }
                now += def;
            });
        });
        return result;
    }

    const load = async title => {
        const target = scores.find(obj => obj.title == title);
        if (!target) throw new Error("song is not exist!");
        if (cache[title]) return cache[title];
        const audio = await mediaLoader.loadAudio("./sounds/" + target.song);
        const score = parseScore(target);
        cache[title] = { audio, score };
        //console.log(score);
        return { audio, score };
    };

    return { add, load };

})();
