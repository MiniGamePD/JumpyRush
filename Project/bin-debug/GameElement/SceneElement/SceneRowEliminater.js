var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneRowEliminater = (function (_super) {
    __extends(SceneRowEliminater, _super);
    function SceneRowEliminater(owner) {
        var _this = _super.call(this, owner) || this;
        _this.directionBitmap = [];
        _this.directionFrameAnim = [];
        _this.renderer = new egret.Bitmap();
        _this.accessory = new egret.DisplayObjectContainer();
        _this.canDrop = true;
        _this.color = GameElementColor.random;
        _this.eliminateMinCount = 1;
        _this.elementType = SceneElementType.RowEliminater;
        _this.RefreshTexture();
        _this.eliminateSound = "EliminateRow_mp3";
        return _this;
    }
    SceneRowEliminater.prototype.RefreshTexture = function () {
        this.framesAnim = this.CreateFramesAnim();
        this.CreateDirFrameAnim(Direction.Right);
        this.CreateDirFrameAnim(Direction.Left);
    };
    SceneRowEliminater.prototype.CreateFramesAnim = function () {
        var framesAnim = new SyncFramesAnim();
        framesAnim.Init(this.renderer, Frame_Anim_CrossEliminater, 150);
        return framesAnim;
    };
    SceneRowEliminater.prototype.CreateDirFrameAnim = function (direction) {
        var framesAnim = new SyncFramesAnim();
        var bitmap = new egret.Bitmap();
        framesAnim.Init(bitmap, Frame_Anim_CrossEliminater_Diretion, 200);
        this.directionBitmap.push(bitmap);
        this.directionFrameAnim.push(framesAnim);
        GameMain.GetInstance().AdapteDisplayObject(bitmap);
        this.accessory.addChild(bitmap);
        bitmap.anchorOffsetY = bitmap.height / 2;
        bitmap.rotation = Tools.GetDirectionRotateAngle(direction);
        bitmap.x = Tools.MoveScenePosX(bitmap.x, direction, Tools.MatchViewElementWidth / 2);
        bitmap.y = Tools.MoveScenePosY(bitmap.y, direction, Tools.MatchViewElementHeight / 2);
    };
    SceneRowEliminater.prototype.UpdateFramesAnim = function () {
        _super.prototype.UpdateFramesAnim.call(this);
        if (this.directionFrameAnim != null
            && this.directionFrameAnim != undefined) {
            for (var i = 0; i < this.directionFrameAnim.length; ++i) {
                this.directionFrameAnim[i].Update();
            }
        }
    };
    SceneRowEliminater.prototype.GetResPathByColor = function () {
        return "zuoyouxiao";
    };
    SceneRowEliminater.prototype.PlayEliminateAnim = function () {
        // this.PlayParticalEff();
        this.PlayScaling();
        // this.MoveOneSide(Direction.Left);
        // this.MoveOneSide(Direction.Right);
        this.RemoveDirectionBitmap();
        this.PlayCrossEliminaterEffect([Direction.Right, Direction.Left]);
        this.PlayEliminateSound();
    };
    SceneRowEliminater.prototype.RemoveDirectionBitmap = function () {
        if (this.directionBitmap != undefined
            && this.directionBitmap != null) {
            for (var i = 0; i < this.directionBitmap.length; ++i) {
                if (this.directionBitmap[i] != null
                    && this.directionBitmap[i].parent != null) {
                    this.directionBitmap[i].parent.removeChild(this.directionBitmap[i]);
                }
            }
            this.directionBitmap = [];
        }
    };
    SceneRowEliminater.prototype.Release = function () {
        this.RemoveDirectionBitmap();
        _super.prototype.Release.call(this);
    };
    return SceneRowEliminater;
}(SceneElementBase));
__reflect(SceneRowEliminater.prototype, "SceneRowEliminater");
//# sourceMappingURL=SceneRowEliminater.js.map