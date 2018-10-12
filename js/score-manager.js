const scoreManager = (_ => {

    "use strict";

    const scores = [];

    const add = json => scores.push(json);

    let audio = null;
    let score = null;
    let bpm = 120;
    let measure = 48;
    let delay = 1000;

    const parseScore = json => {
        bpm = json.bpm;
        measure = 48 * eval(json.measure);
        delay = json.delay;
        const score = json.score;
        const result = [];
        let now = delay;
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
        audio = await mediaLoader.loadAudio("./sounds/" + target.song);
        score = parseScore(target);
        //console.log(score);
        return { audio, score };
    };

    return {
        add, load
    };

})();
