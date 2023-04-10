const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundManager extends cc.Component {

    // Implement Singleton
    private static instance: SoundManager = null;
    onLoad() {
        SoundManager.instance = this;
    }
    public static getInstance(): SoundManager {
        return SoundManager.instance;
    }

    @property(cc.AudioSource)
    public BGM: cc.AudioSource = null;
    
    @property(cc.AudioSource)
    public BulletSound: cc.AudioSource = null;

    @property(cc.AudioSource)
    public EnemyDie: cc.AudioSource = null;

    @property(cc.AudioSource)
    public BoostSound: cc.AudioSource = null;
}
