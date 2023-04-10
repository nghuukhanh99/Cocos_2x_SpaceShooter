import Enemy_Manager from "./Enemy_Manager";
import ExplosionPool from "./ExplosionPool";
import GameManager from "./GameManager";
import SoundManager from "./SoundManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Ply_Enemy extends cc.Component {

  @property
  public Health: number = 8;

  onLoad() {
    // Add this enemy to array
    Enemy_Manager.getInstance().AddToArray(this);
  }

  //Dead
  onCollisionEnter(other: cc.Collider, self: cc.Collider) {

    if (other.node.group === 'Bullet') {
      this.Health -= other.node.getComponent('Bullet').damage;

      // check health < 0, enemy will die

      if (this.Health <= 0) {
        // Remove frome Enemy List
        Enemy_Manager.getInstance().RemoveFromArray(this);
        SoundManager.getInstance().EnemyDie.play();
        // Spawn an Explosion when this enemy die
        const _explosion = ExplosionPool.getInstance().getExplosion();
        _explosion.setPosition(this.node.position);
        _explosion.setParent(GameManager.getInstance().Explosion_Hold);
        
        this.Health = 0;
        
        // Despawn
        this.node.active = false;
      }
    }
  }


}
