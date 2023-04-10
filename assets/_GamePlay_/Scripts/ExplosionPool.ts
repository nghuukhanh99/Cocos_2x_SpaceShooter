const {ccclass, property} = cc._decorator;

@ccclass
export default class ExplosionPool extends cc.Component {

    private static instance: ExplosionPool = null;

    @property(cc.Prefab)
    private prefab: cc.Prefab = null;
    
    private pool: cc.NodePool = null;
    
    onLoad () 
    {
        ExplosionPool.instance = this;
        this.pool = new cc.NodePool();
    }

    public static getInstance(): ExplosionPool{
        return ExplosionPool.instance;
    }

    public getExplosion(): cc.Node
    {
        let explosion = null;

        if(this.pool.size() > 0)
        {
            explosion = this.pool.get();
        }
        else
        {
            explosion = cc.instantiate(this.prefab);
        }
        return explosion;
    }

    public putExplosion(explosion: cc.Node)
    {
        this.pool.put(explosion);
    }

}
