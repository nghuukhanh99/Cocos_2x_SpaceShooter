import ExplosionPool from "./ExplosionPool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Effect_Controller extends cc.Component {

    protected onLoad() {
        this.node.getComponent(cc.Animation).on('Despawn_Effect', this.Despawn_Effect, this);
    }

    // protected onEnable() {
    //     this.schedule(this.Despawn_Effect, 0.5);
    // }

    public Despawn_Effect(event) {
        ExplosionPool.getInstance().putExplosion(this.node);
    }
}
