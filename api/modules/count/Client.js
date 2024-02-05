export class Client {
  constructor(client) {
    this._client = client;
  }

  open() {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    this._client.writeHead(200, headers);
    this._client.write(
      `event:connected\ndata:${JSON.stringify({ ok: true })}\n\n`
    );
    // this.emit('connected', { ok: true });

    this._client.on('close', () => {
      console.log('client closed');
      if (!this._isFinished) {
        this._onCloseCb?.();
      }
    });

    this._client.on('finish', () => {
      console.log('finish');
      this._isFinished = true;
    });
  }

  emit(event, data) {
    this._client.write(`event:${event}\ndata:${JSON.stringify(data)}\n\n`);
  }

  close() {
    this._client.end();
  }

  onClose(cb) {
    this._onCloseCb = cb;
  }
}
