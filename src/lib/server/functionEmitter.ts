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

type EventEmitterFunctions = Array<{session: string, callback: EventCallback}>;

export class EventEmitter {
    private functions: EventEmitterFunctions = []

    add(session: string, callback: (data: unknown) => Promise<void>) {
        // removes unnecessary updates got from session
        // dont need in production, unless someone
        // trying to break sth
        
        if (this.functions.find((f) => f.session)) {
            this.remove(session);
        }

        this.functions.push({
            session: session,
            callback: new EventCallback(callback)
        });
        return session;
    }

    remove(session: string) {
        this.functions = this.functions.filter((f) => f.session !== session)
    }

    // session here is the client, that sent update, so we
    // do not want to update it, unless we want to cause
    // unnecessary update

    emit(session: string, data: unknown) {
        this.functions.forEach(async (f) => {
            if (f.session !== session) {
                f.callback.apply(data); 
            }
            this.remove(session);
        })
    }
}