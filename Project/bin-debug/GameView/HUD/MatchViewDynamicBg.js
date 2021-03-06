var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MatchViewDynamicBg = (function () {
    function MatchViewDynamicBg() {
        this.meteorList = [];
    }
    MatchViewDynamicBg.prototype.Init = function (resModule, matchView) {
        this.resModule = resModule;
        this.matchView = matchView;
        this.CreateMeteor();
        this.PlayMeteorMove();
    };
    MatchViewDynamicBg.prototype.CreateMeteor = function () {
        this.meteorList = [];
        for (var i = 0; i < 5; ++i) {
            var bitmap = this.resModule.CreateBitmapByName("liuxing");
            if (bitmap != null) {
                bitmap.anchorOffsetX = bitmap.width;
                bitmap.x = GameMain.GetInstance().GetStageWidth() + 200;
                bitmap.y = 0;
                this.matchView.addChildAt(bitmap, Tools.GetBackGroundDynamicLayer());
                this.meteorList.push(bitmap);
            }
        }
    };
    MatchViewDynamicBg.prototype.PlayMeteorMove = function () {
        this.meteorInterval = 10000;
        for (var i = 0; i < this.meteorList.length; ++i) {
            var randPosX = (Math.random() + 0.5) * GameMain.GetInstance().GetStageWidth();
            var randPosY = -100;
            var startPos = new egret.Point(randPosX, randPosY);
            var endPos = new egret.Point(randPosY, randPosX);
            var delayTime = i * 1000 + Math.random() * 3000;
            var param = new PaAccMovingParam();
            param.displayObj = this.meteorList[i];
            param.startSpeed = 50;
            param.accelerate = 25;
            param.startPos = startPos;
            param.targetPos = endPos;
            param.needRotate = true;
            param.delayTime = delayTime;
            var event = new PlayProgramAnimationEvent();
            event.param = param;
            GameMain.GetInstance().DispatchEvent(event);
            this.meteorList[i].alpha = 1;
            var alphaParam = new PaAlphaLoopParam();
            alphaParam.displayObj = this.meteorList[i];
            alphaParam.duration = 500 + Math.random() * 1000;
            alphaParam.interval = alphaParam.duration;
            alphaParam.startAlpha = 1;
            alphaParam.endAlpha = 0;
            alphaParam.delayTime = 2000 + Math.random() * 2000 + delayTime;
            var alphaEvent = new PlayProgramAnimationEvent();
            alphaEvent.param = alphaParam;
            GameMain.GetInstance().DispatchEvent(alphaEvent);
        }
    };
    MatchViewDynamicBg.prototype.Update = function (deltaTime) {
        this.meteorInterval -= deltaTime;
        if (this.meteorInterval <= 0) {
            this.PlayMeteorMove();
        }
    };
    MatchViewDynamicBg.prototype.Release = function () {
    };
    return MatchViewDynamicBg;
}());
__reflect(MatchViewDynamicBg.prototype, "MatchViewDynamicBg");
//# sourceMappingURL=MatchViewDynamicBg.js.map