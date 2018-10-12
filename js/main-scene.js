// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function() {
      this.superInit();
      // 背景色を指定
      this.backgroundColor = '#444';
      // ゴリラ作成
      this.gorilla = Gorilla().addChildTo(this);

      // 以下二つのインスタンスにはデバック用の位置値を入れてあるので注意

      // 缶ノーツ作成
      this.can = Can(150,200).addChildTo(this);
      // 本社ノーツ作成
      this.honsha = Honsha(500,200).addChildTo(this);

      // デバック用
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

      //デバック用
      // Aが押されたときresult画面へ
      if (key.getKeyDown('A')) {
        this.exit();
      }
    },
  });
  