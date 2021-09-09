const nAssets = 12;
let nLoaded = 0;
let Sounds, winSound, bgSound, eraseSound;
class Preload extends Phaser.Scene {
    constructor() {
        super({ key: "Preload" });
    }

    preload() {
    }

    createGameObjects() {
        this.cameras.main.fadeOut(0, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Scene1PlayGame');
        });
    }

    create() {
        this.textures.addBase64(KEY_BG_IMG, backgroundLandscapeData);
        nLoaded++;
        this.textures.addBase64(KEY_CHAR_IMG, charData);
        nLoaded++;
        this.textures.addBase64(KEY_SADFACE_CHAR_IMG, sadFaceCharData);
        nLoaded++;
        this.textures.addBase64(KEY_HAPPYFACE_CHAR_IMG, happyFaceCharData);
        nLoaded++;
        this.textures.addBase64(KEY_CLOUD_IMG, couldData);
        nLoaded++;
        this.textures.addBase64(KEY_ERASER_IMG, eraserData);
        nLoaded++;
        this.textures.addBase64(KEY_HAND_IMG, handData);
        nLoaded++;
        this.textures.addBase64(KEY_ARROW_IMG, arrowData);
        nLoaded++;
        this.textures.addBase64(KEY_TEXT_IMG, textData);
        nLoaded++;
        this.textures.addBase64(KEY_TURORIAL_IMG, tutorialData);
        nLoaded++;
        this.textures.addBase64(KEY_LOGO_IMG, logoData);
        nLoaded++;
        Sounds = {
            bgSound: new Howl({
                src: bgSoundData,
                loop: true,
                volume: 0.7
            }),
            winSound: new Howl({
                src: winSoundData,
            }),
            eraseSound: new Howl({
                src: eraseSoundData,
                loop: true
            }),
        };
        nLoaded++;

        if (nLoaded >= nAssets) {
            var actualCreate = this.createGameObjects.bind(this);
            actualCreate();
        }
    }
}

