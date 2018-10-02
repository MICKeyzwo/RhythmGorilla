// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
    gorilla_default1: './img/gorilla/protogori_default1.png',
    gorilla_default2: './img/gorilla/protogori_default2.png',
    gorilla_armup: './img/gorilla/protogori_armup.png',
    gorilla_armdown: './img/gorilla/protogori_armdown.png',
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
  //毎フレーム実行されるメソッド
  update: function(app) {
    var key = app.keyboard;
    if (key.getKeyDown('enter')) {
      //エンターキーが押されたときのアクションをここに書く
      //デバック用
      this.gorilla.action();
    }
  },
});

phina.define('Gorilla', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('gorilla_default1', 250, 250);
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
    this.state = 0;//　0:通常状態 1:アクション中
  },
  update: function(){
    //通常状態
    if(this.state == 0){
      //リズムにのるゴリラ
    }
  },
  //エンターキーが押されたときに呼ぶ
  action: function() {
    self = this;
    this.tweener.clear()
    .call(function(){
      self.holdArm();
    })
    .wait(30)
    .call(function(){
      self.swingDownArm();
    })
    .wait(60)
    .call(function(){
      self.toNormalState();
    })
    .play();
  },
  //ゴリラが腕をふりかぶる
  holdArm: function() {
    this.state = 1; //action中
    //ゴリラの画像を変更
    this.setImage('gorilla_armup', 250, 250);
  },
  //ゴリラが腕を振り下ろす
  swingDownArm: function() {
    //ゴリラの画像を変更
    this.setImage('gorilla_armdown', 250, 250);
  },
  toNormalState: function() {
    this.state = 0; //通常状態にもどる
    this.setImage('gorilla_default1', 250, 250);
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
