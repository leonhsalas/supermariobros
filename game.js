/* global Phaser */

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244 ,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        } 
    },
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
    
    this.floor = this.physics.add.staticGroup()

    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()
    this.mario = this.physics.add.sprite(50, 196, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(500)
    this.physics.add.collider(this.mario, this.floor)

    this.anims.create({
            key: 'mario-walk',
            frames: this.anims.generateFrameNumbers('mario',
                {start: 1, end: 3}
            ),
            frameRate: 10,
            repeat: -1
    })
    this.anims.create({
        key: 'mario-jump',
        frames: [{key: 'mario', frame: 5}]
    })
    this.keys = this.input.keyboard.createCursorKeys()
}

function update() {
    if (this.keys.left.isDown) {
        this.mario.x -= 2
        if (this.mario.body.touching.down)
            this.mario.anims.play('mario-walk', true)
        this.mario.flipX = true
    } else if (this.keys.right.isDown) {
        this.mario.x += 2
        if (this.mario.body.touching.down)
            this.mario.anims.play('mario-walk', true)
        this.mario.flipX = false
    } else {
        this.mario.anims.stop()
        this.mario.setFrame(0)

    }
    if (this.keys.space.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump', true)
    }
}