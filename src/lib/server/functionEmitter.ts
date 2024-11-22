class EventCallback {
    private callback: (
        data: unknown
    ) => Promise<void>

    constructor(
        callback: (
            data: unknown
        ) => Promise<void>
    ) {
        this.callback = callback;
    }

    async apply(data: unknown) {
        await this.callback(
            data
        );
    }
}

type EventEmitterFunctions = {
    [x: string]: Array<{
        uuid: string,
        callback: EventCallback
    }>
}

export class EventEmitter {
    private functions: EventEmitterFunctions = {}

    add(session: string, callback: (data: unknown) => Promise<void>) {
        // removes unnecessary updates got from session
        // dont need in production, unless someone
        // trying to break sth
        
        // if (this.functions.find((f) => f.session)) {
        //     this.remove(session);
        // }

        if (!this.functions[session]) {
            this.functions[session] = [];
        }

        const uuid = crypto.randomUUID();

        this.functions[session].push({
            uuid: uuid,
            callback: new EventCallback(callback)
        });
        return uuid;
    }

    remove(session: string, uuid: string) {
        this.functions[session] = this.functions[session].filter((f) => f.uuid !== uuid)
    }

    removeAll(session: string) {
        this.functions[session] = [];
    }

    // session here is the client, that sent update, so we
    // do not want to update it, unless we want to cause
    // unnecessary update

    emit(session: string, data: unknown) {
        Object.keys(this.functions).forEach((s) => {
            console.log(s);
            this.functions[s].forEach((f) => f.callback.apply(data));
            this.removeAll(s);
        })
    }
}