import { Socket, Server } from 'socket.io';
import {
  SocketController,
  OnConnect,
  OnDisconnect,
  OnMessage,
  MessageBody,
  ConnectedSocket,
  SocketIO
} from 'socket-controllers';

const {v4: uuidv4} = require("uuid");


@SocketController()
export class Controller {
  /*@OnConnect()
  connection(@ConnectedSocket() socket: Socket){
    console.log('client connected', socket.id);
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: Socket){
    console.log('client disconnected', socket.id);
  }

  @OnMessage('start_new_game')
  newGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any){
  }

  @OnMessage('update_game')
  updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any){
  }

  @OnMessage('game_over')
  endGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message:any){
  }*/
}
