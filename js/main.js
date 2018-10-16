var ASSETS = {
  image: {
    gorilla_title: './img/character_gorilla_hardboiled.png',
    gorilla_default1: './img/gorilla/protogori_default1.png',
    gorilla_default2: './img/gorilla/protogori_default2.png',
    gorilla_armup: './img/gorilla/protogori_armup.png',
    gorilla_armdown: './img/gorilla/protogori_armdown.png',
    bom: './img/bom.png',
    explosion: './img/explosion.png',
    can: './img/can.png',
    gomi: './img/gomi.png',
  },
  spritesheet: {
    "explosion_ss":
      {
        // フレーム情報
        "frame": {
          "width": 64, // 1フレームの画像サイズ（横）
          "height": 64, // 1フレームの画像サイズ（縦）
          "cols": 4, // フレーム数（横）
          "rows": 4, // フレーム数（縦）
        },
        // アニメーション情報
        "animations": {
          "explosion": { // アニメーション名
            "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], // フレーム番号範囲
            "next": null, // 次のアニメーション
            "frequency": 2, // アニメーション間隔
          },
        }
      }
  }
}

var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 380;

(async _ => {

  // phina.js をグローバル領域に展開
  await splitter.globalizePhina();
  await splitter.prefix("./js/");
  await splitter.load([
    "media-loader.js",
    "score-manager.js"
  ]);
  await splitter.load([
    "main-scene.js",
    "title-scene.js",
    "gorilla.js",
    "notes.js",
    "result-scene.js"
  ]);
  await splitter.prefix("./score/");
  await splitter.load("score1.js");

  // メイン処理
  phina.main(function () {
    // アプリケーション生成
    var app = GameApp({
      title: 'ゴリラ天国(仮)',
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      assets: ASSETS,
    });
    // アプリケーション実行
    app.run();
  });

})();
