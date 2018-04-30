cc.game.onStart = function () {
    cc.view.adjustViewPort(true)
    cc.view.setRealPixelResolution(960, 640, cc.ResolutionPolicy.SHOW_ALL)
    cc.view.resizeWithBrowserSize(true)
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new StartScene())
    }, this)
}
cc.game.run()