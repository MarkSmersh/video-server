import { sendUpdate } from './socket';

export interface State {
	state: 'idle' | 'watch';
	movie: string | null;
	chapter: string | null;
	time: number;
	isPaused: boolean;
}

class LocalState {
	private state: 'idle' | 'watch' = 'idle';
	private movie: string | null = null;
	private chapter: string | null = null;
	private time: number = 0;
	private isPaused: boolean = true;

	setState(s: 'idle' | 'watch') {
		this.state = s;
		sendUpdate({ state: s });
	}

	setMovie(m: string | null) {
		this.movie = m;
		sendUpdate({ movie: m });
	}

	setChapter(c: string | null) {
		this.chapter = c;
		sendUpdate({ chapter: c });
	}

	setTime(t: number) {
		this.time = t;
		sendUpdate({ time: t });
	}

	setPause(isPaused: boolean) {
		this.isPaused = isPaused;
		sendUpdate({ isPaused: isPaused });
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
}

export const localState = new LocalState();
