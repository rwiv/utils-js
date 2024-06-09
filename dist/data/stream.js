import { Writable } from "stream";
export class WriteStream extends Writable {
    listener;
    constructor(listener) {
        super();
        this.listener = listener;
    }
    static from(listener) {
        return new WriteStream(listener);
    }
    _write(chunk, encoding, callback) {
        try {
            this.listener(chunk, encoding);
            callback();
        }
        catch (e) {
            callback(e);
        }
    }
    waitForClose() {
        return new Promise((resolve, reject) => {
            this.on("close", () => resolve());
            this.on("error", err => reject(err));
        });
    }
}
