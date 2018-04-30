//通过Layer继承方法创建StartLayer层，创建Hello World文字并放在层中间
var StartLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        var size = cc.winSize

        //创建背景Sprite
        this.bgSprite = new cc.Sprite(res.BackGround_png)
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2
        })
        this.addChild(this.bgSprite, 0)

        //创建菜单项startItem，并设置背景为添加的png图片，默认为start_n图片，点击时为start_s图片
        var startItem = new cc.MenuItemImage(
            res.Start_N_png,
            res.Start_S_png,
            function () {
                cc.log("Menu is clicked!")
                //replaceScene方法无法使用，用runScene代替
                cc.director.runScene(new PlayScene())
            }, this)
        startItem.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        })

        //创建菜单menu并将startitem菜单项加入该菜单
        var menu = new cc.Menu(startItem)
        menu.x = 0
        menu.y = 0
        this.addChild(menu, 1)

        return true
    }
})

//通过Scene继承方法创建StartScene场景，并将StartLayer加入场景中
var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super()
        var layer = new StartLayer()
        this.addChild(layer)
    }
})