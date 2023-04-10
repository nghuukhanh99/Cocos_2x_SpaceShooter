import GameManager from "./GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Booster extends cc.Component {

    private Speed: number = 500;

    private time: number = 0;

    private movement: cc.Vec2 = cc.v2(0, 0);

    private threshold: number = 20;
    onEnable() {
        // time to cancel move down to end screeb height
        this.time = 1;
    }

    onDespawn() {
        this.node.active = false;
        this.enabled = false;
        GameManager.getInstance().Fighter.Ship_Level_Up();
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {

        if (other.node.group === 'Player') {
            this.onDespawn();
        }
    }

    update(dt) {

        if (this.time > 0) {
            // calculate pivot of boost: when active is move down to end screen height
            const direction = cc.v2(0, -1).rotateSelf(this.node.angle * Math.PI / 180);

            // add info with deltatime to boost interact with player
            const velocity = direction.mul(this.Speed);
            const delta = velocity.mul(cc.director.getDeltaTime());
            const v3Delta = new cc.Vec3(delta.x, delta.y, 0);
            const newPos = this.node.position.add(v3Delta);

            // move down the boost
            this.node.setPosition(newPos);

            // after time move on screen, boost will move toward player
            this.time -= dt;
        }
        else {
            //get info player
            const playerPos = GameManager.getInstance().Fighter.node.position;

            //get info this boost
            const boostPos = this.node.position;

            // calculate distance btw this boost with player
            const distance = playerPos.sub(boostPos).mag();
            const direction = playerPos.sub(boostPos).normalize();

            // movement action
            const movement = direction.mul(2000 * dt);

            // move this boost towards player node
            this.node.position = boostPos.add(movement);

            // checking if distance btw this boost with player = 0, it will despawn self
            if (distance < this.threshold) {
                this.onDespawn();
            }
        }
    }

   
}
