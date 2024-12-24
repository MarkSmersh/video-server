<script lang="ts">
	interface Snowflake {
		x: number;
		y: number;
		r: number;
		a: number;
	}

	function drawSnowflake(
		ctx: CanvasRenderingContext2D,
		x?: number,
		y?: number,
		r?: number,
		a?: number
	): Snowflake {
		let radius = r || Math.floor(Math.random() * 5 + 2);

		let posX = x || Math.floor(Math.random() * (winWidth - radius));
		let posY = y || -radius;

		let alpha = a || Math.random() + 0.5;

		ctx.beginPath();
		ctx.arc(posX, posY, radius, 0, Math.PI * 2);

		ctx.fillStyle = `rgba(255, 255, 255, ${alpha > 1 ? alpha - 0.5 : alpha})`;
		ctx.fill();

		ctx.closePath();

		return { x: posX, y: posY, r: radius, a: alpha };
	}

	function stepSnowflakes(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, winWidth, winHeight);

		if (snowflakes.length <= 800 && framesPassed / fps > 0.05) {
			framesPassed = 0;

			let newSnowflake = drawSnowflake(ctx);

			snowflakes.push(newSnowflake);
		}

		let updatedSnowflakes: Snowflake[] = [];

		for (let i = 0; i < snowflakes.length; i++) {
			let s = snowflakes[i];

			let newY = s.y + s.r * 0.1;

			if (s.y < winHeight + 10) {
				updatedSnowflakes.push({ x: s.x, y: newY, r: s.r, a: s.a });
			}

			drawSnowflake(ctx, s.x, newY, s.r, s.a);
		}

		snowflakes = updatedSnowflakes;
	}

	let canvas: HTMLCanvasElement | null = $state(null);

	let snowflakes: Snowflake[] = $state([]);

	let lastAt: number = $state(0);
	let fps: number = $state(0);
	let framesPassed = $state(0);

	let winHeight: number = $state(document.documentElement.scrollHeight);
	let winWidth: number = $state(document.documentElement.scrollWidth);

	function frame() {
		if (canvas) {
			let ctx = canvas.getContext('2d');

			if (ctx) {
				fps = 1000 / (Date.now() - lastAt);
				lastAt = Date.now();
				framesPassed++;

				stepSnowflakes(ctx);
			}
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);

	window.addEventListener('resize', () => {
		winHeight = document.documentElement.scrollHeight;
		winWidth = document.documentElement.scrollWidth;
	});

	window.addEventListener('scrollend', () => {
		winHeight = document.documentElement.scrollHeight;
		winWidth = document.documentElement.scrollWidth;
	});

	$inspect(snowflakes);
</script>

<div class="data">
	<h2>
		FPS: {fps}
	</h2>
	<h2>
		Snowflakes: {snowflakes.length}
	</h2>
</div>
<canvas width={winWidth} height={winHeight} id="snowfall" bind:this={canvas}> 123 </canvas>

<style>
	.data {
		position: absolute;
		bottom: 0;
		/* display: none; */
	}

	#snowfall {
		position: absolute;
		z-index: 0;
	}
</style>
