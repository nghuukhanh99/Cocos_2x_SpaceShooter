import Bullet from "./Bullet";
import Enemy_Manager from "./Enemy_Manager";
import GameManager from "./GameManager";
import NodePool from "./NodePool";
import SoundManager from "./SoundManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Ship extends cc.Component {

  // Spawn Pos
  @property(cc.Node)
  public bulletSpawnPos_Center: cc.Node = null;

  @property({
    type: [cc.Node],
    tooltip: 'SpawnPos2Line'
  })
  public bulletSpawnPos_2: cc.Node[] = [];

  @property({
    type: [cc.Node],
    tooltip: 'SpawnPos3Line'
  })
  public bulletSpawnPos_3: cc.Node[] = [];

  @property({
    type: [cc.Node],
    tooltip: 'SpawnPos5Line'
  })
  public bulletSpawnPos_5: cc.Node[] = [];

  // Parent hold bullet
  @property(cc.Node)
  public BulletHold: cc.Node = null;

  private startPos: cc.Vec2 = cc.Vec2.ZERO;
  private isTouchDown: boolean = false;

  @property
  public CanShoot: boolean = false;
  @property
  public CountClick: number = 0;
  @property
  public tweenDuration: number = 0.2;

  @property
  public Count_Boost_Bullet: number = 1;

  @property
  public isBooster: boolean = false;

  private DurationSpawn: number;

  @property(cc.Node)
  public Shield: cc.Node = null;

  @property(cc.Node)
  public Ripple: cc.Node = null;

  @property(cc.Node)
  public HandTut: cc.Node = null;

  // Add event listeners to define touch screen action
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    this.DurationSpawn = 0.2;
  }

  protected start() {
    this.moveTo(new cc.Vec3(0, -600, 0), this.tweenDuration);
  }
  // This function checks when touching the screen to start moving the ship
  private onTouchStart(event: cc.Event.EventTouch) {
    if (GameManager.getInstance().CanMove == true) {
      this.startPos = event.getLocation();
      this.isTouchDown = true;

      // First time call to start spawn bullet
      if (this.CountClick < 1) {
        this.CanShoot = true;
        this.SpawnBullet();
        this.CountClick++;
        this.Ripple.active = false;
        this.HandTut.active = false;
      }
    }
  }

  private onTouchMove(event: cc.Event.EventTouch) {
    if (this.isTouchDown && GameManager.getInstance().CanMove == true) {
      const delta = event.getLocation().sub(this.startPos);
      const newPos = this.node.position.add(new cc.Vec3(delta.x, delta.y, 0));

      // Calculate distance ship can move
      const screenSize = cc.view.getVisibleSize();
      const halfWidth = this.node.width / 2;
      const halfHeight = this.node.height / 2;
      const minX = -540
      const maxX = 540;
      const minY = -880;
      const maxY = 880;
      const clampedX = cc.misc.clampf(newPos.x, minX, maxX);
      const clampedY = cc.misc.clampf(newPos.y, minY, maxY);

      // Check to limit ship can't move out of bound
      this.node.position = new cc.Vec3(clampedX, clampedY, 0);
      this.startPos = event.getLocation();
    }
  }

  // This function checks when we endtouching the screen, ship can't move
  private onTouchEnd(event: cc.Event.EventTouch) {
    if (GameManager.getInstance().CanMove == true) {
      this.isTouchDown = false;
    }
  }
  // Same touchEnd
  private onTouchCancel(event: cc.Event.EventTouch) {
    if (GameManager.getInstance().CanMove == true) {
      this.isTouchDown = false;
    }
  }

  // this function is remove the event listeners to avoid memory leaks
  onDestroy() {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  }

  protected update(dt: number) {
    // Sometime Cocos creator imperative write this code if you want a child move with parent, not like unity(child auto move follow parent if parent move)
    // 1Line
    this.bulletSpawnPos_Center.setPosition(this.node.getPosition());
    this.bulletSpawnPos_Center.y += 110;

    // 2Line
    this.bulletSpawnPos_2[0].setPosition(this.node.position);
    this.bulletSpawnPos_2[0].x -= 25;
    this.bulletSpawnPos_2[0].y += 110;
    this.bulletSpawnPos_2[1].setPosition(this.node.position);
    this.bulletSpawnPos_2[1].x += 25;
    this.bulletSpawnPos_2[1].y += 110;

    // 3Line
    this.bulletSpawnPos_3[1].setPosition(this.node.position);
    this.bulletSpawnPos_3[1].x -= 45;
    this.bulletSpawnPos_3[1].y += 80;
    this.bulletSpawnPos_3[2].setPosition(this.node.position);
    this.bulletSpawnPos_3[2].x += 45;
    this.bulletSpawnPos_3[2].y += 80;

    // 9Line
    for (let i = 0; i < this.bulletSpawnPos_5.length; i++) {
      this.bulletSpawnPos_5[i].setPosition(this.node.position);
      this.bulletSpawnPos_5[i].y += 110;
    }
  }

  SpawnBullet() {
    // if canshoot boolean = false, this function will be cancel
    if (this.CanShoot == false) {
      return;
    }

    if (this.Count_Boost_Bullet == 1) {// 1Line
      this.Info_For_Bullet(this.bulletSpawnPos_Center.position, 1500, 0.25, this.bulletSpawnPos_Center);
    }
    if (this.Count_Boost_Bullet == 2) {// 2Line
      for (let i = 0; i < this.Count_Boost_Bullet; i++) {
        this.Info_For_Bullet(this.bulletSpawnPos_2[i].position, 1500, 0.2, this.bulletSpawnPos_2[i]);
      }
    }
    if (this.Count_Boost_Bullet == 3) {// 3Line
      for (let i = 0; i < this.Count_Boost_Bullet; i++) {
        this.Info_For_Bullet(this.bulletSpawnPos_3[i].position, 1800, 0.2, this.bulletSpawnPos_3[i]);
      }
    }
    if (this.Count_Boost_Bullet == 4) {// 9Line
      for (let i = 0; i < 9; i++) {
        this.Info_For_Bullet(this.bulletSpawnPos_5[i].position, 1800, 0.2, this.bulletSpawnPos_5[i]);
      }
    }
    // Recursive bullet to infinity shoot bullet
    if (this.CanShoot == true) this.schedule(this.SpawnBullet, this.DurationSpawn);
  }

  public moveTo(targetPosition: cc.Vec3, duration: number): void {
    cc.tween(this.node)
      .to(duration, { position: new cc.Vec3(targetPosition.x, targetPosition.y, targetPosition.z) }, {
        easing: "linear",
      })
      .call(() => {
        GameManager.getInstance().CanMove = true;
        this.Ripple.active = true;
        this.HandTut.active = true;
      })
      .start();
  }

  public scaleTo(scaleNow: number, scaleOld: number, duration: number): void {
    cc.tween(this.node)
      .to(duration, { scale: scaleNow }, {
        easing: "linear",
      })
      .call(() => {
        cc.tween(this.node)
          .to(duration, { scale: scaleOld }, {
            easing: "linear",
          })
        .start();
      })
      .start();
  }

  Ship_Level_Up() {
    this.Count_Boost_Bullet++;
    this.scaleTo(1.2, 1, 0.5);
    this.Shield.active = true;
    SoundManager.getInstance().BoostSound.play();
  }
  // Set info for bullet
  public Info_For_Bullet(Pos: cc.Vec3, speed: number, Duration: number, SpawnPoint: cc.Node) {
    // Spawn bullet on sceen
    const bullet = NodePool.getInstance().getNode();
    SoundManager.getInstance().BulletSound.play();
    // Make bullet get info from bullet script
    const Bullet_Info = bullet.getComponent(Bullet);
    Bullet_Info.SpawnPoint = SpawnPoint;
    Bullet_Info.speed = speed;
    this.DurationSpawn = Duration;

    // Set position spawn and parent
    Bullet_Info.node.setPosition(Pos);
    Bullet_Info.node.setParent(this.BulletHold);
  }
}