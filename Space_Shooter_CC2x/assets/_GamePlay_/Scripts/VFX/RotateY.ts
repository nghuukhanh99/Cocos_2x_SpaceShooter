
const { ccclass, property } = cc._decorator;

@ccclass
export default class RotateY extends cc.Component {

    @property
    speed: number = 200; // rotation speed in degrees per second

    start() {
        // add update function to update node's rotation every frame
        this.schedule(this.update, 0, cc.macro.REPEAT_FOREVER);
    }

    update(dt: number) {
        // calculate rotation amount based on delta time and rotation speed
        const rotationAmount = this.speed * dt;
        // rotate node on z-axis
        this.node.angle += rotationAmount;
    }

}
