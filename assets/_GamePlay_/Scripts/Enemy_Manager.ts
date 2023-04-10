import Booster from "./Booster";
import GameManager from "./GameManager";
import Ply_Enemy from "./Ply_Enemy";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy_Manager extends cc.Component {
  // Implement Singleton
  private static instance: Enemy_Manager = null;
  onLoad() {
    Enemy_Manager.instance = this;
  }
  public static getInstance(): Enemy_Manager {
    return Enemy_Manager.instance;
  }

  @property(cc.Node)
  public Enemy_Container: cc.Node = null;

  @property(Ply_Enemy)
  public EnemyList: Ply_Enemy[] = [];

  @property
  public Booster: number = 2;

  @property(cc.Prefab)
  public Booster_Prefab: cc.Prefab = null;

  @property(cc.Node)
  public Boost_Hold: cc.Node = null;

  @property(cc.Node)
  public Wave1: cc.Node = null;

  @property(cc.Node)
  public Wave2: cc.Node = null;

  @property
  public WaveCount: number = 1;

  @property(cc.Node)
  public Wave2_Left: cc.Node = null;

  @property(cc.Node)
  public Wave2_Right: cc.Node = null;

  start() {
    //Wave 1 move to screen
    this.moveTo(this.Wave1, new cc.Vec3(0, 0, 0), 1);
    console.log(this.EnemyList.length);
  }

  public moveTo(Wave: cc.Node, targetPosition: cc.Vec3, duration: number): void {
    cc.tween(Wave)
      .to(duration, { position: new cc.Vec3(targetPosition.x, targetPosition.y, targetPosition.z) }, {
        easing: "linear",
      })
      .call(() => {
        // Can modify some function like turn on UI when wave move on screen completed
      })
      .start();
  }

  protected update(dt: number) {
    // Check Count Eneny if <= 0, go to Wave 2
    if (this.EnemyList.length <= 0 && this.WaveCount == 1) {
      this.WaveCount = 2;
      this.Wave2.active = true;

      if (this.Wave2.activeInHierarchy == true) {
        this.moveTo(this.Wave2_Left, new cc.Vec3(0, 0, 0), 0.7);
        this.moveTo(this.Wave2_Right, new cc.Vec3(0, 0, 0), 0.7);
      }
    } //Wave 3
    else if (this.EnemyList.length <= 0 && this.WaveCount == 2) {
      this.WaveCount = 3;
      GameManager.getInstance().Winner = true;
    }
  }

  // Add enemy to Array => You can manager number of enemy
  public AddToArray(Enemy: Ply_Enemy) {
    if (!this.EnemyList.includes(Enemy)) {
      this.EnemyList.push(Enemy);
    }
  }

  // Remove enemy from Array => You can check to next wave
  public RemoveFromArray(Enemy: Ply_Enemy) {
    const index = this.EnemyList.indexOf(Enemy);
    const V3_Enemy = new cc.Vec3(Enemy.node.position.x, Enemy.node.position.y, 0);
    if (index !== -1) {
      this.EnemyList.splice(index, 1);
    }
    console.log(this.EnemyList.length);

    if (this.Booster > 0 && (Math.floor(Math.random() * 101)) > 20) {
      this.Booster--;
      const Boost = cc.instantiate(this.Booster_Prefab);
      const Boost_Info = Boost.getComponent(Booster);
      Boost_Info.node.position = V3_Enemy;
      Boost_Info.node.setParent(this.Boost_Hold);
    }
  }
}
