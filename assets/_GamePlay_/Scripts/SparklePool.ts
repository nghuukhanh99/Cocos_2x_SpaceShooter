
const {ccclass, property} = cc._decorator;

@ccclass
export default class SparklePool extends cc.Component {

    private static instance: SparklePool = null;

    @property(cc.Prefab)
    private prefab: cc.Prefab = null;
    
    private pool: cc.NodePool = null;
    
    onLoad () 
    {
        SparklePool.instance = this;
        this.pool = new cc.NodePool();
    }

    public static getInstance(): SparklePool{
        return SparklePool.instance;
    }

    public getSparkle(): cc.Node
    {
        let Sparkle = null;

        if(this.pool.size() > 0)
        {
            Sparkle = this.pool.get();
        }
        else
        {
            Sparkle = cc.instantiate(this.prefab);
        }
        return Sparkle;
    }

    public putSparkle(Sparkle: cc.Node)
    {
        this.pool.put(Sparkle);
    }
}
