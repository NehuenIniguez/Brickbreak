export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {}

  create() {
    //reconocimiento del mouse
    this.pointer = this.input.activePointer;
    // crear pala como rectangulo
    this.paddle = this.add.rectangle(400, 500, 100, 20, 0x6666ff);

    // crear bola como circulo
    this.ball = this.add.circle(400, 300, 10, 0xff6666);

    //crear obstaculo
    this.obstacle = this.add.rectangle(400, 200, 100, 100, 0x66ff66);

    //agregarlos a las fisicas
    this.physics.add.existing(this.paddle);
    this.physics.add.existing(this.ball);
    this.physics.add.existing(this.obstacle);

    //hacer la paleta inamovible
    this.paddle.body.setImmovable(true);

    //agregar configuraciones de fisicas a la paleta
    this.paddle.body.setCollideWorldBounds(true);

    //agregar configuracion de fisicas a la pelota
    this.ball.body.setCollideWorldBounds(true);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setVelocity(200, 200);

    //agregar configuracion de fisicas al obstaculo
    this.obstacle.body.setImmovable(true);

    //agregar cursor
    this.cursor = this.input.keyboard.createCursorKeys();

    //colision de la pelota con la paleta
    this.physics.add.collider(this.paddle, this.ball, null, null, this);

    //colision de la pelota con el obstaculo
    this.ball.body.onWorldBounds = true;
    this.physics.add.collider(
      this.obstacle,
      this.ball,
      this.handleCollision,
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down) {
        console.log("hit bottom");
        this.scene.start("game");
      }
    });
  }

  update() {
    this.paddle.x = this.pointer.x;
    if (this.cursor.right.isDown) {
      this.paddle.x += 10;
    } else if (this.cursor.left.isDown) {
      this.paddle.x -= 10;
    }
  }

  handleCollision = (obstacle, ball) => {
    console.log("collision");
    obstacle.destroy();
  };
}
