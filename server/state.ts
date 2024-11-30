class State {
	private state: 'idle' | 'watch' = 'idle';
	private movie: string | null = null;
	private chapter: string | null = null;
	private time: number = 0;
	private isPaused: boolean = true;

	constructor() {
		this.counter();
	}

	setState(s: 'idle' | 'watch') {
		this.state = s;
		this.movie = null;
		this.chapter = null;
		this.time = 0;
		this.isPaused = true;
	}

	setMovie(m: string | null) {
		this.movie = m;
		this.chapter = null;
	}

	setChapter(c: string | null) {
		this.chapter = c;
	}

	setTime(t: number) {
		this.time = t;
	}

	setPause(isPaused: boolean) {
		this.isPaused = isPaused;
	}

	get() {
		return {
			state: this.state,
			movie: this.movie,
			chapter: this.chapter,
			time: this.time,
			isPaused: this.isPaused
		};
	}

	private async counter() {
		await new Promise((resolve) => {
			setTimeout(() => resolve(null), 1000);
		});

		if (!this.isPaused) {
			this.time += 1;
		}

		await this.counter();
	}
}

export interface ClientState {
	state?: 'idle' | 'watch';
	movie?: string | null;
	chapter?: string | null;
	time?: number;
	isPaused?: boolean;
}

export const state = new State();
