interface Track {
    src: string,
    type: "video" | "captions"
}

class FunctionEvent {
    private callback: (
        data: any
    ) => Promise<void>

    constructor(
        callback: (
            data: any
        ) => Promise<void>
    ) {
        this.callback = callback;
    }

    async apply(data: any) {
        await this.callback(
            data
        );
    }
}

interface FunctionEmitterFunctions {
    update: {
        id: string,
        f: FunctionEvent
    }[]
}

export class FunctionEmitter {
    private functions: FunctionEmitterFunctions = {
        update: [],
    }

    add(state: keyof FunctionEmitterFunctions, func: (data: any) => Promise<void>) {
        const id = crypto.randomUUID();
        this.functions[state].push({
            id: id,
            f: new FunctionEvent(func)
        });
        return { state: state, id: id };
    }

    remove(state: keyof FunctionEmitterFunctions, id: string) {
        this.functions[state] = this.functions[state].filter((_v, _i) => _v.id !== id)
    }

    emit(state: keyof FunctionEmitterFunctions, data: any) {
        this.functions[state].forEach(async (v, i) => {
            v.f.apply(data);
            this.functions[state] = this.functions[state].filter((_v, _i) => _v.id !== v.id)
        })
    }
}