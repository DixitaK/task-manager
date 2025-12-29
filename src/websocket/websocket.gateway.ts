import {  WebSocketGateway,  WebSocketServer} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  emitTaskCreated(task: any) {
    this.server.emit("task.created", task);
  }

  emitTaskUpdated(task: any) {
    this.server.emit("task.updated", task);
  }
}
