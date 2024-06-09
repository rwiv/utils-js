import {Writable} from "stream";

type WriteListener = (chunk: any, encoding: BufferEncoding) => void;

export class WriteStream extends Writable {

  constructor(
    protected readonly listener: WriteListener,
  ) {
    super();
  }

  static from(listener: WriteListener) {
    return new WriteStream(listener);
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    try {
      this.listener(chunk, encoding);
      callback();
    } catch (e) {
      callback(e as Error);
    }
  }

  waitForClose() {
    return new Promise<void>((resolve, reject) => {
      this.on("close", () => resolve());
      this.on("error", err => reject(err));
    });
  }
}
