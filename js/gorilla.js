//画面中に鎮座するゴリラ
//音ゲーマーのメタファー
phina.define('Gorilla', {
    superClass: 'Sprite',
    init: function() {
      this.superInit('gorilla_default1', 250, 250);
      this.x = SCREEN_WIDTH / 2 - 120;
      this.y = SCREEN_HEIGHT / 2;
      this.state = 0;//　0:通常状態 1:アクション中
    },
    update: function(){
      //通常状態
      if(this.state == 0){
        //リズムにのるゴリラ
      }
    },
    //エンターキーが押されたときに呼ぶ
    action: function() {
      self = this;
      this.tweener.clear()
      .call(function(){
        self.holdArm();
      })
      .wait(30)
      .call(function(){
        self.swingDownArm();
      })
      .wait(60)
      .call(function(){
        self.toNormalState();
      })
      .play();
    },
    //ゴリラが腕をふりかぶる
    holdArm: function() {
      this.state = 1; //action中
      //ゴリラの画像を変更
      this.setImage('gorilla_armup', 250, 250);
    },
    //ゴリラが腕を振り下ろす
    swingDownArm: function() {
      //ゴリラの画像を変更
      this.setImage('gorilla_armdown', 250, 250);
    },
    toNormalState: function() {
      this.state = 0; //通常状態にもどる
      this.setImage('gorilla_default1', 250, 250);
    }
  });
