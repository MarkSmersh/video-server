import { sendUpdate } from './socket';

export interface State {
	state: 'idle' | 'watch';
	video: string | null;
	time: number;
	isPaused: boolean;
}

class LocalState {
	private state: 'idle' | 'watch' = 'idle';
	private video: string | null = null;
	private time: number = 0;
	private isPaused: boolean = true;

	setState(s: 'idle' | 'watch') {
		this.state = s;
		sendUpdate({ state: s });
	}

	setVideo(v: string | null) {
		this.video = v;
		sendUpdate({ video: v });
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
			video: this.video,
			time: this.time,
			isPaused: this.isPaused
		};
	}
}

export const localState = new LocalState();
