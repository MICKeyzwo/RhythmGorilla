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
    this.point = 20;
    this.brokenY = position_y + 50;
  },
  // 潰れた缶に差し替え
  doAction: function(dec){
    if(dec){
      this.point = 0;
      this.setImage('gomi', 120, 120);
      this.y = this.brokenY;
      sound_can.cloneNode().play();
    }
  }
});

// 本社クラスを定義
phina.define('Honsha',{
  superClass: 'Notes',
  init: function(self, position_x, position_y){
    this.superInit('bom');
    this.x = position_x;
    this.y = position_y;
    this.point = -10;
    // スプライト画像作成
    this.sprite = Sprite('explosion').addChildTo(self.explosionLayer);
    var sprite = this.sprite;
    this.sprite.setPosition(this.x, this.y);
    sprite.alpha = 0; // スプライトを透明に
    // スプライトにフレームアニメーションをアタッチ
    this.anim = FrameAnimation('explosion_ss').attachTo(sprite);
    this.brokenY = position_y + 10;
  },
  // 爆発スプライトシート着火
  doAction: function(dec){
    var fire = this.anim;
    var sprite = this.sprite;
    if(dec){
      this.point = 0;
      this.y = this.brokenY;
      sprite.alpha = 1; // スプライトシートを可視化
      sprite.setPosition(this.x, this.y).setScale(8.0, 8.0);
      fire.gotoAndPlay('explosion'); // 爆破！ｗ
      sound_honsha.cloneNode().play();
      this.setImage('sold', 130, 130);
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
