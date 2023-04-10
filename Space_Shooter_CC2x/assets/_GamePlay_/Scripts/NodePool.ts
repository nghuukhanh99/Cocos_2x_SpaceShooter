import Bullet from "./Bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodePool extends cc.Component {

    private static instance: NodePool = null;

    @property(cc.Prefab)
    private prefab: cc.Prefab = null;

    private pool: cc.NodePool = null;

    onLoad() {
        NodePool.instance = this;
        this.pool = new cc.NodePool();
    }

    public static getInstance(): NodePool {
        return NodePool.instance;
    }

    public getNode(): cc.Node {
        let node = null;
        if (this.pool.size() > 0) {
            node = this.pool.get();
        } else {
            node = cc.instantiate(this.prefab);
        }
        return node;
    }

    public putNode(node: cc.Node) {
        this.pool.put(node);
    }
}
