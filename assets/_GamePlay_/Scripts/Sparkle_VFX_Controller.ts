import SparklePool from "./SparklePool";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sparkle_VFX_Controller extends cc.Component {

    protected onLoad() {
        this.node.getComponent(cc.Animation).on('Despawn_Effect', this.Despawn_Effect, this);
    }

    // protected onEnable() {
    //     this.schedule(this.Despawn_Effect, 0.5);
    // }

    public Despawn_Effect(event) {
        SparklePool.getInstance().putSparkle(this.node);
    }
}
