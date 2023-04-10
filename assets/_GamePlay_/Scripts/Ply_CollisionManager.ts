const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    onLoad () 
    {
        // Enable Collision System
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }
}
