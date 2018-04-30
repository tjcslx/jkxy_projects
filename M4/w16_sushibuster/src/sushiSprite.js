var SushiSprite = cc.Sprite.extend({
    disappearAction: null, //消失动画
    onEnter: function () {
        cc.log("onEnter")
        this._super()
        this.addTouchEventListener()
        this.disappearAction = this.createDisappearAction()
        this.disappearAction.retain()
    },
    onExit: function () {
        cc.log("onExit")
            //手动释放对消失动画的引用
        this.disappearAction.release()
        this._super()
    },
    //添加触摸/点击事件
    addTouchEventListener: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan事件中时间播放消失动画以及移除寿司
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation()
                var target = event.getCurrentTarget()
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    target.removeTouchEventListener()
                        //响应Sprite点中
                    cc.log("pos.x=" + pos.x + ",pos.y=" + pos.y)

                    target.stopAllActions()

                    var ac = target.disappearAction
                    var seqAc = cc.Sequence.create(ac, cc.CallFunc.create(function () {
                        cc.log("callfun........")
                            //                        target.getParent().addScore()
                            //                        target.getParent().removeSushiByindex(target.index - 1)
                        target.removeFromParent()

                    }, target))

                    target.runAction(seqAc)

                    return true
                }
                return false
            }
        })
        cc.eventManager.addListener(this.touchListener, this)
    },
    //添加寿司Sprite的消失动画
    createDisappearAction: function () {
        var frames = []
        for (var i = 0; i < 11; i++) {
            var str = "sushi_1n_" + i + ".png"
            var frame = cc.spriteFrameCache.getSpriteFrame(str)
            frames.push(frame)
        }

        var animation = new cc.Animation(frames, 0.02)
        var action = new cc.Animate(animation)

        return action
    },
    //移除注册的touch事件，避免再次被点击
    removeTouchEventListener: function () {
        cc.eventManager.removeListener(this.touchListener)
    }
})