import SoundManager from "./SoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DirectStore extends cc.Component {

   GoToStore()
   {
        SoundManager.getInstance().BGM.enabled = false;
        cc.sys.openURL("https://play.google.com/store/apps/details?id=com.alienshooter.galaxy.attack2");
   }
}
