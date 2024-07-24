/* global Phaser */

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244 ,
    backgroundColor: '#049cd8',
    parent: 'game',
    scene: {
        preload,
        create,
        update
    }
}

new Phaser.Game(config)

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {frameWidth: 18, frameHeight: 16}
    )
}

function create() {
    this.cloud = this.add.image(100, 50, 'cloud1')
        .setScale(0.15)
        .setOrigin(0, 0)
    this.bricks = this.add.tileSprite(0, config.height - 32, config.width, 32, 'floorbricks')
        .setOrigin(0, 0)
    this.mario = this.add.sprite(50, 212, 'mario')
        .setOrigin(0, 1)
    this.keys = this.input.keyboard.createCursorKeys()
}

function update() {
    if (this.keys.left.isDown) {
        this.mario.x -= 2
    } else if (this.keys.right.isDown) {
        this.mario.x += 2
    }
}