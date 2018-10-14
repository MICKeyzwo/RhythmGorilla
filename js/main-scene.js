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
      this.noteSpeed = 7;
      this.notes = [];
      scoreManager.load("score1").then((data) => {
        this.song = data;
        this.song.audio.play();
        data.score.forEach((item) => {
          //これを変えると上手くいかない
          notePositionX = (item.time/33.647)*this.noteSpeed + 30 + this.gorilla.x;
          notePositionY = 200;
          //缶の場合
          if(item.type == 1){
            newCan = Can().addChildTo(this);
            newCan.setPosition(notePositionX,notePositionY);
            newCan.timing = item.time;
            self.notes.push(newCan);
          //本社の場合
          }else if(item.type == 2){
            newHonsha = Honsha().addChildTo(this);
            newHonsha.setPosition(notePositionX,notePositionY);
            newHonsha.timing = item.time;
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
      this.notes.forEach((item)=>{
        item.x -= this.noteSpeed;
        var duration = 30;
        if(Math.abs(this.song.audio.currentTime*1000 - item.timing) < duration){
          console.log(item.x);
          item.doAction(true);
        }
      });
      //デバック用
      // Aが押されたときresult画面へ
      if (key.getKeyDown('A')) {
        this.exit();
      }
    },
  });
