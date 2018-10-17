// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'DisplayScene',
    init: function() {
      this.superInit();
      // 背景色を指定
      this.backgroundColor = '#444';
      this.backLayer = DisplayElement().addChildTo(this);
      this.notesLayer = DisplayElement().addChildTo(this);
      this.armLayer = DisplayElement().addChildTo(this);
      this.fistLayer = DisplayElement().addChildTo(this);
      this.explosionLayer = DisplayElement().addChildTo(this);
      this.background = Sprite("background", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this.backLayer);
      this.background.x = SCREEN_WIDTH/2;
      this.background.y = SCREEN_HEIGHT/2;
      // ゴリラ作成
      this.gorilla = Gorilla(this).addChildTo(this.backLayer);
      this.judgePositionX = this.gorilla.x - 90;
      this.conveyor = Sprite("conveyor", SCREEN_WIDTH, SCREEN_HEIGHT).addChildTo(this.backLayer);
      this.conveyor.x = SCREEN_WIDTH/2;
      this.conveyor.y = SCREEN_HEIGHT - 95;
      this.triangle = TriangleShape({fill:"red", scaleX:0.3, scaleY:0.3}).addChildTo(this);
      this.triangle.setPosition(this.judgePositionX+10, this.conveyor.y+85);
      this.notes = [];
      scoreManager.load("score1").then((data) => {
        this.song = data;
        this.song.audio.play();
        data.score.forEach((item) => {
          var notePositionX = (item.time / 1000) * (SCREEN_WIDTH - this.gorilla.x);
          var notePositionY = 300;
          //缶の場合
          if(item.type == 1){
            var newCan = Can(notePositionX, notePositionY).addChildTo(this.notesLayer);
            newCan.timing = item.time;
            this.notes.push(newCan);
          //本社の場合
          }else if(item.type == 2){
            var newHonsha = Honsha(this, notePositionX, notePositionY).addChildTo(this.notesLayer);
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
        item.x = ((item.timing - now) / 1000) * 200 + this.judgePositionX;
        var duration = 220;
        if (key.getKeyDown('enter')) {
          var timingDiff = duration - Math.abs(item.timing - (now + duration/2));
          if(timingDiff >= 0){
            console.log(timingDiff);
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
