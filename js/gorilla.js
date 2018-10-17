//画面中に鎮座するゴリラ
//音ゲーマーのメタファー
phina.define('Gorilla', {
    superClass: 'Sprite',
    init: function(self) {
      this.sizeX = 460;
      this.sizeY = 360
      this.superInit('gorilla_default1', this.sizeX, this.sizeY);
      this.x = SCREEN_WIDTH / 2 - 50;
      this.y = SCREEN_HEIGHT / 2 + 20;
      this.state = 0;//　0:通常状態 1:アクション中
      this.arm = Sprite("arm_swingdown", this.sizeX - 90, this.sizeY - 70).addChildTo(self.armLayer);
      this.arm.x = this.x - 90;
      this.arm.y = this.y + 27;
      this.arm.alpha = 0;
      this.fist = Sprite("fist", this.sizeX + 60, this.sizeY + 20).addChildTo(self.fistLayer);
      this.fist.x = this.x + 30;
      this.fist.y = this.y - 20;
      this.fist.alpha = 0;
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
      sound_swing.cloneNode().play();
      self.arm.alpha = 0;
      self.fist.alpha = 0;
      this.tweener.clear()
      .call(function(){
        self.holdArm();
      })
      .wait(50)
      .call(function(){
        self.arm.alpha = 1;
        self.fist.alpha = 0;
        self.swingDownArm();
      })
      .wait(120)
      .call(function(){
        self.arm.alpha = 0;
        self.fist.alpha = 0;
        self.toNormalState();
      })
      .play();
    },
    //ゴリラが腕をふりかぶる
    holdArm: function() {
      this.state = 1; //action中
      //ゴリラの画像を変更
      this.setImage('gorilla_armup', this.sizeX, this.sizeY);
    },
    //ゴリラが腕を振り下ろす
    swingDownArm: function() {
      //ゴリラの画像を変更
      this.setImage('gorilla_armdown', this.sizeX, this.sizeY);
    },
    toNormalState: function() {
      this.state = 0; //通常状態にもどる
      this.setImage('gorilla_default1', this.sizeX, this.sizeY);
    }
  });
