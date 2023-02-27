class Websocket1 {
  socket: WebSocket;
  constructor(url) {
    this.socket = new WebSocket(url);
  }

  onMessage(event) {
    this.socket.onmessage = event;
  }

  onOpen(event) {
    this.socket.onopen = event;
  }

  onError(event) {
    this.socket.onerror = event;
  }

  onClose(event) {
    this.socket.onclose = event;
  }

  send(message) {
    this.socket.send(JSON.stringify(message));
  }
}

export default Websocket1;
