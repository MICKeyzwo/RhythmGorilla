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
  