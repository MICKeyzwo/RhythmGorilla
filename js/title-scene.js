// TitleScene クラスを定義
phina.define('TitleScene', {
    superClass: 'DisplayScene',
    // コンストラクタ
    init: function() {
      this.superInit();
      Sprite('gorilla_title',300,300).addChildTo(this).setPosition(this.gridX.center(),200)
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
  