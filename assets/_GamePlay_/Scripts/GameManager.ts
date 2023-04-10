import Ship from "./Ship";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    // Implement Singleton
    private static instance: GameManager = null;
    onLoad() {
        GameManager.instance = this;
    }
    public static getInstance(): GameManager {
        return GameManager.instance;
    }

    // Variables
    @property
    public CanMove: Boolean = false;

    @property(cc.Node)
    public Explosion_Hold: cc.Node = null;

    @property(Ship)
    public Fighter: Ship = null;

    @property
    public Winner: boolean = false;

    @property(cc.Node)
    public EndcardShipPoint: cc.Node = null;

    @property(cc.Node)
    public EndcardShipEndPoint: cc.Node = null;

    @property
    public EndingGame: boolean = false;

    @property(cc.Node)
    public Endcard: cc.Node = null;

    protected update(dt: number) {
        // Check win to endcard
        if (this.Winner == true && this.EndingGame == false) {
            this.Fighter.CanShoot = false;
            this.CanMove = false;
            this.EndingGame = true;
            this.moveTo(this.Fighter.node, this.EndcardShipPoint.position, 0.6);
        }
    }

    public moveTo(Ship: cc.Node, targetPosition: cc.Vec3, duration: number): void {
        cc.tween(Ship)
            .to(duration, { position: new cc.Vec3(targetPosition.x, targetPosition.y, targetPosition.z) }, {
                easing: "sineOut",
            })
            .call(() => {
                // Can modify some function like turn on UI when wave move on screen completed
                cc.tween(Ship)
                    .delay(0.07)
                    .to(0.5, { position: new cc.Vec3(this.EndcardShipEndPoint.x, this.EndcardShipEndPoint.y, this.EndcardShipEndPoint.z) }, {
                        easing: "quintIn",
                    })
                    .delay(0.3)
                    .call(() => {
                        console.log('Endcard UI');
                        this.Endcard.active = true;
                    })
                    .start();
            })
            .start();
    }
}
