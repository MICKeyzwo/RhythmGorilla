// phina.js をグローバル領域に展開
phina.globalize();
var ASSETS = {
  image: {
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
      "animations" : {
        "explosion": { // アニメーション名
          "frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], // フレーム番号範囲
          "next": null, // 次のアニメーション
          "frequency": 2, // アニメーション間隔
        },
      }
    }
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
    // ゴリラ作成
    this.gorilla = Gorilla().addChildTo(this);
    // 缶ノーツ作成
    this.can = Can().addChildTo(this);
    // 本社ノーツ作成
    this.honsha = Honsha().addChildTo(this);

    var self = this;
    this.can.onpointstart = function(){
      self.can.doAction(true);
    }
    this.honsha.onpointstart = function(){
      self.honsha.doAction(true);
    }
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

// ノーツクラスを定義
phina.define('Notes',{
  superClass: 'Sprite',
  init: function(img){
    this.superInit(img, 100, 100);
    var speed = 10;
    // this.physical.velocity.x = -speed;

    this.setInteractive(true);
  },
  // 判定を受け取ってノーツごとのアクション
  // 各ノーツクラスでオーバーライド
  doAction: function(dec){
  }
});

// 缶クラスを定義
phina.define('Can',{
  superClass: 'Notes',
  init: function(){
    this.superInit('can');
    this.x = 100;
    this.y = 200;
  },
  // 潰れた缶に差し替え
  doAction: function(dec){
    if(dec){
      this.setImage('gomi', 100, 100);
    }
  }
});

// 本社クラスを定義
phina.define('Honsha',{
  superClass: 'Notes',
  init: function(){
    this.superInit('bom');
    this.x = 500;
    this.y = 200;
    // スプライト画像作成
    var sprite = Sprite('explosion', 128, 120).addChildTo(this);    
    // スプライトにフレームアニメーションをアタッチ
    this.anim = FrameAnimation('explosion_ss').attachTo(sprite);
  },
  // 爆発スプライトシート着火
  doAction: function(dec){
    var fire = this.anim;
    if(dec){
      fire.gotoAndPlay('explosion');
    }
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
