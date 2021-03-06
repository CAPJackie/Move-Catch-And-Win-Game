import Entity, {Trait} from "./Entity.js";
import Go from "./traits/Go.js";
import Jump from "./traits/Jump.js";
import Life from "./traits/Life.js";
import {loadSpriteSheet} from "./loaders.js";
import {createAnimation} from "./animation.js";

export function createPlayer() {
	return loadSpriteSheet("player1")
	.then((sprites) => {
		const player = new Entity();
		player.size.set(12, 16);
		player.vel.set(0, 0);
		player.lifePoints = 1000;
		player.addTrait(new Go());
		player.addTrait(new Jump());
		player.addTrait(new Life());

		const  runAnimation = createAnimation(["run_1", "run_2"], 10);
		function routeFrame(player) {
			var animation = "quiet";
			if (!player.jump.ready) {
				animation = "jump";
			} else if (player.go.dir !== 0) {
				animation = runAnimation(player.go.distance);
			}
			return animation;
		}

		player.draw = function drawPlayer(context) {
			sprites.draw(routeFrame(this), context, this.pos.x, this.pos.y, this.go.heading < 0);
		};

		return player;
	});
}
