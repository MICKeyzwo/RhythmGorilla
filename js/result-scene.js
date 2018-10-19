//resultScene クラスを定義
phina.define("ResultScene", {
    superClass: 'DisplayScene',
    init: function() {
      this.superInit();
      Label({
        text:"SCORE: " + gamePoints,
        fontSize:64,
        stroke:'brack',
        fill:'white',
      }).addChildTo(this)
        .setPosition(this.gridX.center(), this.gridY.span(2));
      Label({
        text:"ENTER RE:START",
        fontSize:32,
        stroke:'brack',
        fill:'white',
      }).addChildTo(this)
        .setPosition(this.gridX.center(), this.gridY.span(5))
        .tweener.fadeOut(1000).fadeIn(500).setLoop(true).play();
    },
    // 毎フレーム実行されるメソッド
    update: function(app) {
        var key = app.keyboard;
        // エンターキーが押されたとき次の画面へ移動
        if (key.getKeyDown('enter')) {
          // 次のシーンへ
          gamePoints = 0;
          this.exit();
        }
      },
  });
