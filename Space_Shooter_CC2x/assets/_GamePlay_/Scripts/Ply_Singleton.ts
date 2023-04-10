const { ccclass, property } = cc._decorator;

@ccclass('Ply_Singleton')
export abstract class Ply_Singleton<T extends Ply_Singleton<T>> {
    public static Ins: Ply_Singleton<any>;

    public static getIns<T extends Ply_Singleton<T>>(this: new () => T): T {
        if(!Ply_Singleton.Ins){
            Ply_Singleton.Ins = new this();
        }
        return Ply_Singleton.Ins as T;
    }
}


