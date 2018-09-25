// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
    gorilla: './img/character_gorilla_hardboiled.png',
  }
}
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 380;

// TitleScene クラスを定義
phina.define('TitleScene', {
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    this.superInit();
    Sprite('gorilla',300,300).addChildTo(this).setPosition(this.gridX.center(),200)
    Label({
      text:'ゴリラ天国',
      fontSize:64,
      stroke:'brack',
      fill:'white',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1));
    Label({
      text:"TOUCH START",
      fontSize:32,
      stroke:'brack',
      fill:'white',
    }).addChildTo(this)
      .setPosition(this.gridX.center(), this.gridY.span(5))
      .tweener.fadeOut(1000).fadeIn(500).setLoop(true).play();
    // 画面タッチ時
    this.on('pointend', function() {
      // 次のシーンへ
      this.exit();
    });
  },
});

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
    }
  },
});

phina.define('Gorilla', {
  superClass: 'Sprite',
  init: function() {
    this.superInit('gorilla', 250, 250);
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
    this.tweener
    .call(function(){
      this.holdArm();
    })
    .wait(30)
    .call(function(){
      this.swingDownArm();
    })
    .wait(30)
    .call(function(){
      toNormalState();
    });
  },
  //ゴリラが腕をふりかぶる
  holdArm: function() {
    this.state = 1; //action中
    //ゴリラの画像を変更
  },
  //ゴリラが腕を振り下ろす
  swingDownArm: function() {
    //ゴリラの画像を変更
  },
  toNormalState: function() {
    this.state = 0; //通常状態にもどる
  }
});

// ノーツクラスを定義
phina.define('Notes',{
  superClass: 'Sprite',
  init: function(){
    this.superInit();
    var speed = 10;
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.physical.velocity.x = -speed;
  },
  // 判定を受け取ってノーツごとのアクション
  // 各ノーツクラスでオーバーライド
  doAction: function(dec){
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
