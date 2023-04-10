const {ccclass, property} = cc._decorator;

@ccclass
export default class ParallaxBackground extends cc.Component {

    @property(cc.Node)
    layer1: cc.Node = null;

    @property(cc.Node)
    layer2: cc.Node = null;

    @property(cc.Float)
    layer1Speed: number = 0.1;

    @property(cc.Float)
    layer2Speed: number = 0.2;

    private layer1StartPos: cc.Vec3 = cc.Vec3.ZERO;
    private layer2StartPos: cc.Vec3 = cc.Vec3.ZERO;

    start() {
        this.layer1StartPos = this.layer1.position;
        this.layer2StartPos = this.layer2.position;
    }

    update(dt: number) {
        const screenSize = cc.view.getVisibleSize();
        const delta1 = cc.v2(0, -this.layer1Speed * screenSize.height * dt);
        const delta2 = cc.v2(0, -this.layer2Speed * screenSize.height * dt);
        this.layer1.position = this.layer1.position.add(new cc.Vec3(delta1.x, delta1.y, 0));
        this.layer2.position = this.layer2.position.add(new cc.Vec3(delta2.x, delta2.y, 0));

        if (this.layer1.position.y <= -1920) {
            this.layer1.position = new cc.Vec3(0, 1916, 0);
        }

        if (this.layer2.position.y <= -1920) {
            this.layer2.position = new cc.Vec3(0, 1916, 0);
        }
    }
}

