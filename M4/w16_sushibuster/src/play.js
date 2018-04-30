var PlayLayer = cc.Layer.extend({
    bgSprite: null,
    SushiSprites: null,
    //继承SushiSprite创建寿司，图片为sushi.png中的第一张sushi_1n.png，x坐标值为随机生成
    addSushi: function () {
        var sushi = new SushiSprite("#sushi_1n.png")

        var size = cc.winSize

        var x = sushi.width / 2 + size.width / 2 * cc.random0To1()
        sushi.attr({
            x: x,
            y: size.height - 20
        })

        this.addChild(sushi, 5)

        //创建直线下落动作dropAction，并让寿司Sprite运行该动作
        var dropAction = cc.MoveTo.create(4, cc.p(sushi.x, -30))
        sushi.runAction(dropAction)

        this.SushiSprites.push(sushi)
    },
    removeSushi: function () {
        //移除到屏幕底部的sushi，存在问题！
        for (var i = 0; i < this.SushiSprites.length; i++) {
            cc.log("removeSushi.........")
            if (-30 == this.SushiSprites[i].y) {
                cc.log("==============remove:" + i)
                this.SushiSprites[i].removeFromParent()
                this.SushiSprites[i] = undefined
                this.SushiSprites.splice(i, 1)
                i = i - 1
            }
        }
    },
    update: function () {
        this.addSushi()
        this.removeSushi()
    },
    ctor: function () {
        this._super()

        var size = cc.winSize

        this.SushiSprites = []

        //加载打包的帧图片到缓存
        cc.spriteFrameCache.addSpriteFrames(res.Sushi_plist)

        //添加背景
        this.bgSprite = new cc.Sprite(res.BackGround_png)
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            rotation: 180
        })
        this.addChild(this.bgSprite, 0)

        //将寿司Sprite其添加到层中
        this.addSushi()

        //通过定时器在层中加入更多寿司Sprite
        this.schedule(this.update, 1, 16 * 1024, 1)

        return true
    }
})

var PlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var layer = new PlayLayer()
        this.addChild(layer)
    }
})