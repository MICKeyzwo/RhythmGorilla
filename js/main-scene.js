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
      this.notes = [];
      scoreManager.load("score1").then((data) => {
        console.log(data);
        this.song = data;
        this.song.audio.play();
        data.score.forEach((item) => {
          notePositionX = self.gorilla.x + item.time/3;
          notePositionY = 200;
          //缶の場合
          if(item.type == 1){
            newCan = Can().addChildTo(this);
            newCan.setPosition(notePositionX,notePositionY);
            self.notes.push(newCan);
          //本社の場合
          }else if(item.type == 2){
            newHonsha = Honsha().addChildTo(this);
            newHonsha.setPosition(notePositionX,notePositionY);
            self.notes.push(newHonsha);
          }
        });
      });
    },
    //毎フレーム実行されるメソッド
    update: function(app) {
      var key = app.keyboard;
      if (key.getKeyDown('enter')) {
        //エンターキーが押されたときのアクションをここに書く
        //デバック用
        this.gorilla.action();
      }
      this.notes.forEach((item) => {
        item.x -= 30;
        // if(this.song.audio.currentTime == item.timing) {
        //
        // }
      });
    },
  });
