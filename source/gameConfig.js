var game;
var config = {
    type: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? Phaser.CANVAS : Phaser.AUTO,
    backgroundColor: "#ececec",
    scale: {
        mode: Phaser.Scale.RESIZE,
        // parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    audio: {
        disableWebAudio: true
    },
    /*ScaleResize*/
    scene: [Preload, Scene1PlayGame],
    input: {
        activePointers: 3,
    },
};
game = new Phaser.Game(config);

