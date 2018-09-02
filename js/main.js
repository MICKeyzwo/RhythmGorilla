// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
    gorilla: './img/character_gorilla_hardboiled.png',
  }
}
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 380;

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#444';
    this.gorilla = Gorilla().addChildTo(this);
  },
});

phina.define('Gorilla', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('gorilla', 250, 250);
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
  }
});

// メイン処理
phina.main(function() {
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
