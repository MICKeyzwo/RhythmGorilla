// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function() {
      this.superInit();
      // 背景色を指定
      this.backgroundColor = '#444';
      // ゴリラ作成
      this.gorilla = Gorilla().addChildTo(this);
      this.notes = [];
      scoreManager.load("score1").then((data) => {
        this.song = data;
        this.song.audio.play();
        data.score.forEach((item) => {
          var notePositionX = (item.time / 1000) * (SCREEN_WIDTH - this.gorilla.x);
          var notePositionY = 200;
          //缶の場合
          if(item.type == 1){
            var newCan = Can().addChildTo(this);
            newCan.setPosition(notePositionX,notePositionY);
            newCan.timing = item.time;
            this.notes.push(newCan);
          //本社の場合
          }else if(item.type == 2){
            var newHonsha = Honsha().addChildTo(this);
            newHonsha.setPosition(notePositionX,notePositionY);
            newHonsha.timing = item.time;
            this.notes.push(newHonsha);
          }
        });
      });
    },
    //毎フレーム実行されるメソッド
    update: function(app) {
      var key = app.keyboard;
      if (key.getKeyDown('enter')) {
        this.gorilla.action();
      }
      this.notes.forEach((item)=>{
        const now = this.song.audio.currentTime * 1000;
        item.x = ((item.timing - now) / 1000) * 200 + this.gorilla.x;
        var duration = 60;
        if (key.getKeyDown('enter')) {
          if(Math.abs(now - item.timing) < duration){
            item.doAction(true);
          }
        }
      });
      //デバック用
      // Aが押されたときresult画面へ
      if (key.getKeyDown('A')) {
        this.exit();
      }
    },
  });
