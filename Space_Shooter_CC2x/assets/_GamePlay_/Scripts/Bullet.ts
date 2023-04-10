import GameManager from "./GameManager";
import NodePool from "./NodePool";
import SparklePool from "./SparklePool"


const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    @property
    speed: number = 2000;
    @property
    damage: number = 4;
    @property
    public SpawnPoint: cc.Node;
    private movement: cc.Vec2 = cc.v2(0, 0);

    update(dt: number) {
        // this.node.y += this.speed * dt;

        // add info with deltatime to bullet move follow Y pivot and rotation of spawn point
        const direction = cc.v2(0, 1).rotateSelf(this.SpawnPoint.angle * Math.PI / 180);
        const velocity = direction.mul(this.speed);
        const delta = velocity.mul(cc.director.getDeltaTime());
        const v3Delta = new cc.Vec3(delta.x, delta.y, 0);
        const newPos = this.node.position.add(v3Delta);

        // move bullet forward with info of spawn point (pivot & rotation)
        this.node.setPosition(newPos);

        // despawn bullet if out of bound
        if (this.node.position.y >= 950) {
            NodePool.getInstance().putNode(this.node);
        }
    }

    // Despawn bullet if col with enemy
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {

        if (other.node.group === 'Enemy') {
            // spawn a Sparkle 
            const Sparkle = SparklePool.getInstance().getSparkle();
            Sparkle.setPosition(this.node.position);
            Sparkle.setParent(GameManager.getInstance().Explosion_Hold);
            NodePool.getInstance().putNode(this.node);
        }
    }


}
