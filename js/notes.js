// ノーツクラスを定義
phina.define('Notes',{
  superClass: 'Sprite',
  init: function(img){
    this.superInit(img, 100, 100);
    this.timing = 0;

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
  init: function(position_x, position_y){
    this.superInit('can');
    this.x = position_x;
    this.y = position_y;
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
  init: function(position_x, position_y){
    this.superInit('bom');
    this.x = position_x;
    this.y = position_y;
    // スプライト画像作成
    this.sprite = Sprite('explosion').addChildTo(this);
    var sprite = this.sprite;
    sprite.alpha = 0; // スプライトを透明に
    // スプライトにフレームアニメーションをアタッチ
    this.anim = FrameAnimation('explosion_ss').attachTo(sprite);
  },
  // 爆発スプライトシート着火
  doAction: function(dec){
    var fire = this.anim;
    var sprite = this.sprite;
    if(dec){
      sprite.alpha = 1; // スプライトシートを可視化
      sprite.setPosition(sprite.x, sprite.y).setScale(8.0, 8.0);
      fire.gotoAndPlay('explosion'); // 爆破！ｗ
    }
  },
  update: function() {
    var fire = this.anim;
    var sprite = this.sprite;
    // アニメーション終了時
    if (fire.finished) {
      sprite.alpha = 0; // スプライトシートを透明に
    }
  },
});
  