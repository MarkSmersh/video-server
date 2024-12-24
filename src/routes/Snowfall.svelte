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

		lastSnowflake += timeDiff;

		if (snowflakes.length <= 500 && lastSnowflake >= 1000 / snowPerSec) {
			let newSnowflake = drawSnowflake(ctx);

			lastSnowflake = 0;
			snowflakes.push(newSnowflake);
		}

		let updatedSnowflakes: Snowflake[] = [];

		for (let i = 0; i < snowflakes.length; i++) {
			let s = snowflakes[i];

			let newY = s.y + s.r * timeDiff * 0.01;

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
	let timeDiff: number = $state(0);
	let lastSnowflake: number = $state(0);

	let winHeight: number = $state(document.documentElement.clientHeight);
	let winWidth: number = $state(document.documentElement.clientWidth);

	let snowPerSec: number = $state(5);

	function frame() {
		if (canvas) {
			let ctx = canvas.getContext('2d');

			if (ctx) {
				timeDiff = Date.now() - lastAt;
				fps = 1000 / timeDiff;
				lastAt = Date.now();

				stepSnowflakes(ctx);
			}
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);

	window.addEventListener('resize', () => {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	});

	window.addEventListener('scroll', () => {
		winHeight = document.documentElement.scrollHeight;
		winWidth = document.documentElement.clientWidth;
	});

	$inspect(snowPerSec);
</script>

<!-- TODO: -->
<!-- It's better to have dedicated Menu'-->

<div class="menu">
	<button onclick={() => (snowPerSec = 0)}>0❆</button>
	<button onclick={() => (snowPerSec = 5)}>5❆</button>
	<button onclick={() => (snowPerSec = 25)}>25❆</button>
</div>
<canvas width={winWidth} height={winHeight} id="snowfall" bind:this={canvas}>123</canvas>

<style>
	.menu {
		position: absolute;
		z-index: 20;
		display: flex;
		padding: 8px;
		background: var(--secondary);
		border-radius: 8px;
		top: 16px;
		left: 50%;
		align-content: center;
		margin: auto;
		gap: 8px;
		translate: -50%;

		button {
			padding: 4px 8px;
			background: var(--primary);
			border-radius: 8px;
			color: var(--primary-text);
			cursor: pointer;
		}
	}

	#snowfall {
		position: absolute;
		top: 0;
		z-index: 0;
	}
</style>
