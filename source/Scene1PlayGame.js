let count = 0;
let fill = 0;
let eraserPercentage = 0;
let isTap = false;
let isMove = 0;
let pxCount;

class Scene1PlayGame extends Phaser.Scene {
    constructor() {
        super({ key: "Scene1PlayGame" });
    }

    create() {
        const that = this;
        this.backgroundImg = this.add.image(0, 0, KEY_BG_IMG).setOrigin(0);
        this.charImg = this.add.image(0, 0, KEY_CHAR_IMG).setOrigin(0).setScale(0.35).setDepth(0);
        this.sadFaceImg = this.add.image(0, 0, KEY_SADFACE_CHAR_IMG).setOrigin(0).setScale(0.35).setVisible(true);
        this.happyFaceImg = this.add.image(0, 0, KEY_HAPPYFACE_CHAR_IMG).setOrigin(0).setScale(0.35).setVisible(false);
        this.arrowImg = this.add.image(0, 0, KEY_ARROW_IMG).setOrigin(0).setScale(0.5).setDepth(3);
        this.eraseIMG = this.add.image(0, 0, KEY_ERASER_IMG).setOrigin(0).setScale(0.3).setDepth(3);
        this.handIMG = this.add.image(0, 0, KEY_HAND_IMG).setOrigin(0).setScale(0.3).setDepth(3);
        this.textIMG = this.add.image(0, 0, KEY_TEXT_IMG).setOrigin(0).setScale(0.6).setDepth(2);
        this.tutorialImg = this.add.image(0, 0, KEY_TURORIAL_IMG).setOrigin(0).setScale(0.5).setDepth(2);
        this.logo = this.add.image(0, 0, KEY_LOGO_IMG).setOrigin(0).setScale(0.4);
        this.canvas = this.textures.createCanvas("canvastexture", 1280, 720);
        this.cloud = this.textures.get(KEY_CLOUD_IMG).getSourceImage();
        this.brush = this.textures.get(KEY_BRUSH_IMG).getSourceImage();

        let brushHalfWidth = this.textures.get(KEY_BRUSH_IMG).get().halfWidth;
        let brushHalfHeight = this.textures.get(KEY_BRUSH_IMG).get().halfHeight;
        this.canvas.draw(50, 200, this.cloud);
        pxCount = that.count(that.canvas);
        // this.texture.imageData.width = 300;
        // this.texture.clear();


        // let text = this.add.text(0, 0, "Eraserd: 0%", { backgroundColor: '#0009' })
        // .setDepth(1);

        this.add.image(0, 0, "canvastexture").setOrigin(0);
        this.input.on("pointermove", function (pointer) {
            if (pointer.isDown && eraserPercentage < 85) {
                that.erase(that.canvas, that.brush, pointer.x - brushHalfWidth, pointer.y - brushHalfHeight);
                that.eraseIMG.setPosition((pointer.x - brushHalfWidth - 5).toFixed(0), (pointer.y - brushHalfHeight - 5).toFixed(0))
                if (isMove == 0) {
                    Sounds["eraseSound"].play();
                    isMove++
                }
            } else { }
        });

        this.input.on("pointerdown", function (pointer) {
            if (eraserPercentage >= 85) {
                console.log('aaaaa');
            } else {
                that.eraseIMG.setPosition((pointer.x - brushHalfWidth - 5).toFixed(0), (pointer.y - brushHalfHeight - 5).toFixed(0));
                that.erase(that.canvas, that.brush, pointer.x - brushHalfWidth, pointer.y - brushHalfHeight);
                if (isTap == false) {
                    console.log("haha!");
                    that.tutorialImg.destroy();
                    that.arrowImg.destroy();
                    that.handIMG.destroy();
                    Sounds["bgSound"].play();
                    isTap = true;
                    fill = pxCount.filled;
                }
            }
        });

        this.input.on("pointerup", function () {
            Sounds["eraseSound"].stop();
            isMove = 0;
            pxCount = that.count(that.canvas);
            let percentEraser = (100 * ((fill - pxCount.filled) / fill)).toFixed(0)

            // text.setText(`Erased: ${percentEraser}%`);
            eraserPercentage = percentEraser;
            if (percentEraser >= 85) {
                console.log("Win");
                Sounds["winSound"].play();
                Sounds["bgSound"].stop();
            }
        });
        this.resize();
        window.addEventListener('onload', this.resize.bind(this));
        this.scale.on("resize", this.resize2, this);
    }

    erase(canvasTexture, source, x, y) {
        canvasTexture.getContext().globalCompositeOperation = "destination-out";
        canvasTexture.draw(x, y, source);
    }

    count(canvasTexture) {
        let pixels = canvasTexture.getPixels();
        let filled = 0;
        let total = 0;

        for (let x = 0, c = pixels.length; x < c; x++) {
            let row = pixels[x];

            for (let y = 0, r = row.length; y < r; y++) {
                if (row[y].alpha) filled++;

                total++;
            }
        }
        return { filled: filled, empty: total - filled, total: total };
    }
    resize2(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width, height = gameSize.height;
        let halfWidth = width / 2, halfHeight = height / 2;
        let wratio = width / height, ratio = 9 / 14;

        this.canvas.clear();

        if (wratio < ratio) {
            console.log('pp');

            this.backgroundImg.displayWidth = 1280;
            this.backgroundImg.displayHeight = height;
            this.backgroundImg.height = height;

            this.charImg.setScale(0.35)
            this.sadFaceImg.setScale(0.35)
            this.happyFaceImg.setScale(0.35)
            this.logo.setScale(0.4);

            this.charImg.setPosition(halfWidth - (this.charImg.width / 5.7), halfHeight - (this.charImg.height / 6));
            this.sadFaceImg.setPosition(halfWidth - (this.sadFaceImg.width / 4.8), halfHeight - (this.sadFaceImg.height / 1.7));
            this.happyFaceImg.setPosition(this.sadFaceImg.x, this.sadFaceImg.y);

            this.tutorialImg.setPosition(this.sadFaceImg.x - 40, this.sadFaceImg.y - 90);
            this.eraseIMG.setPosition(this.sadFaceImg.x + 70, this.sadFaceImg.y - 150);
            this.handIMG.setPosition(this.sadFaceImg.x + 120, this.sadFaceImg.y - 120);
            this.arrowImg.setPosition(this.sadFaceImg.x - 30, this.sadFaceImg.y - 140);

            this.textIMG.setPosition(halfWidth / 2, 20)
            this.logo.setPosition(halfWidth - (this.logo.width / 5), height - 100);
            this.canvas.draw(halfWidth - (this.cloud.width / 1.9), this.sadFaceImg.y - 170, this.cloud);
            this.tweens.add({
                targets: this.arrowImg,
                props: {
                    x: {
                        from: this.arrowImg.x,
                        to: this.arrowImg.x + 50,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
            this.tweens.add({
                targets: this.handIMG,
                props: {
                    x: {
                        from: this.handIMG.x,
                        to: this.handIMG.x + 10,
                        duration: 500,
                        flipX: false
                    },
                    y: {
                        from: this.handIMG.y,
                        to: this.handIMG.y + 10,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
        } else {
            console.log("ll");
            this.backgroundImg.displayWidth = width;
            this.backgroundImg.displayHeight = height;

            this.charImg.setScale(0.25)
            this.sadFaceImg.setScale(0.25)
            this.happyFaceImg.setScale(0.25)
            this.logo.setScale(0.3);

            this.charImg.setPosition(halfWidth + (this.charImg.width / 8) - 20, halfHeight - (this.charImg.height / 8) + 20);
            this.sadFaceImg.setPosition(halfWidth + (this.charImg.width / 4.4) - 20, halfHeight - (this.sadFaceImg.height / 2.1) + 20);
            this.happyFaceImg.setPosition(this.sadFaceImg.x, this.sadFaceImg.y);

            this.tutorialImg.setPosition(this.sadFaceImg.x - 50, this.sadFaceImg.y - 70);
            this.eraseIMG.setPosition(this.sadFaceImg.x + 50, this.sadFaceImg.y - 150);
            this.handIMG.setPosition(this.sadFaceImg.x + 100, this.sadFaceImg.y - 120);
            this.arrowImg.setPosition(this.sadFaceImg.x - 50, this.sadFaceImg.y - 140)

            this.textIMG.setPosition(halfWidth - (this.logo.width / 4) - 20, halfHeight - 80)
            this.logo.setPosition(halfWidth - (this.logo.width / 3.5) - 20, halfHeight);

            this.canvas.draw(halfWidth + 10 - 20, this.sadFaceImg.y - 160, this.cloud);
            this.tweens.add({
                targets: this.arrowImg,
                props: {
                    x: {
                        from: this.arrowImg.x,
                        to: this.arrowImg.x + 50,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
            this.tweens.add({
                targets: this.handIMG,
                props: {
                    x: {
                        from: this.handIMG.x,
                        to: this.handIMG.x + 10,
                        duration: 500,
                        flipX: false
                    },
                    y: {
                        from: this.handIMG.y,
                        to: this.handIMG.y + 10,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
        }
    }
    resize() {

        let width = window.innerWidth, height = window.innerHeight;
        let halfWidth = width / 2, halfHeight = height / 2;
        let wratio = width / height, ratio = 9 / 14;
        this.canvas.clear();

        if (wratio < ratio) {
            console.log('pp');
            this.backgroundImg.displayWidth = 1280;
            this.backgroundImg.displayHeight = height;
            this.backgroundImg.height = height;

            this.charImg.setScale(0.35)
            this.sadFaceImg.setScale(0.35)
            this.happyFaceImg.setScale(0.35)
            this.logo.setScale(0.4);

            this.charImg.setPosition(halfWidth - (this.charImg.width / 5.2), halfHeight - (this.charImg.height / 6));
            this.sadFaceImg.setPosition(halfWidth - (this.sadFaceImg.width / 3), halfHeight - (this.sadFaceImg.height / 1.8));
            this.happyFaceImg.setPosition(halfWidth - (this.happyFaceImg.width / 3), halfHeight - (this.happyFaceImg.height / 1.8));

            this.tutorialImg.setPosition(this.sadFaceImg.x - 40, this.sadFaceImg.y - 90);
            this.eraseIMG.setPosition(this.sadFaceImg.x + 70, this.sadFaceImg.y - 150);
            this.handIMG.setPosition(this.sadFaceImg.x + 120, this.sadFaceImg.y - 120);
            this.arrowImg.setPosition(this.sadFaceImg.x - 30, this.sadFaceImg.y - 140);

            this.textIMG.setPosition(halfWidth / 2, 20)
            this.logo.setPosition(halfWidth - (this.logo.width / 4.8), height - 100);

            this.canvas.draw(halfWidth - (this.cloud.width / 1.9), this.sadFaceImg.y - 170, this.cloud);
            this.tweens.add({
                targets: this.arrowImg,
                props: {
                    x: {
                        from: this.arrowImg.x,
                        to: this.arrowImg.x + 50,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
            this.tweens.add({
                targets: this.handIMG,
                props: {
                    x: {
                        from: this.handIMG.x,
                        to: this.handIMG.x + 10,
                        duration: 500,
                        flipX: false
                    },
                    y: {
                        from: this.handIMG.y,
                        to: this.handIMG.y + 10,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
        } else {
            console.log("ll");
            this.canvas.draw(halfWidth, this.sadFaceImg.y - 150, this.cloud);
            this.backgroundImg.displayWidth = width;
            this.backgroundImg.displayHeight = height;

            this.charImg.setScale(0.25)
            this.sadFaceImg.setScale(0.25)
            this.happyFaceImg.setScale(0.25)
            this.logo.setScale(0.3);

            this.charImg.setPosition(halfWidth + (this.charImg.width / 8) - 20, halfHeight - (this.charImg.height / 8) + 20);
            this.sadFaceImg.setPosition(halfWidth + (this.charImg.width / 4.4) - 20, halfHeight - (this.sadFaceImg.height / 2.1) + 20);
            this.happyFaceImg.setPosition(this.sadFaceImg.x, this.sadFaceImg.y - 2);

            this.tutorialImg.setPosition(this.sadFaceImg.x - 50, this.sadFaceImg.y - 70);
            this.eraseIMG.setPosition(this.sadFaceImg.x + 50, this.sadFaceImg.y - 150);
            this.handIMG.setPosition(this.sadFaceImg.x + 100, this.sadFaceImg.y - 120);
            this.arrowImg.setPosition(this.sadFaceImg.x - 50, this.sadFaceImg.y - 140)

            this.textIMG.setPosition(halfWidth - (this.logo.width / 4) - 20, halfHeight - 80)
            this.logo.setPosition(halfWidth - (this.logo.width / 3.5) - 20, halfHeight);

            this.canvas.draw(halfWidth + 10 - 20, this.sadFaceImg.y - 160, this.cloud);
            this.tweens.add({
                targets: this.arrowImg,
                props: {
                    x: {
                        from: this.arrowImg.x,
                        to: this.arrowImg.x + 50,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
            this.tweens.add({
                targets: this.handIMG,
                props: {
                    x: {
                        from: this.handIMG.x,
                        to: this.handIMG.x + 10,
                        duration: 500,
                        flipX: false
                    },
                    y: {
                        from: this.handIMG.y,
                        to: this.handIMG.y + 10,
                        duration: 500,
                        flipX: false
                    },
                },
                ease: "Linear",
                yoyo: true,
                repeat: -1,
            });
        }

    }
    update() {
        if (eraserPercentage >= 85) {
            this.sadFaceImg.setVisible(false);
            this.happyFaceImg.setVisible(true)
        }
    }

}
