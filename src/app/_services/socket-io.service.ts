import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import socketIO from 'socket.io-client';
import * as socketConst from '../shared/socket-constants.js';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private url = 'http://localhost:3000';
  private socket = socketIO(this.url);

  private subData: Subject<any> = new Subject<any>();
  private SubVote: Subject<any> = new Subject<any>();
  private SubVirar: Subject<any> = new Subject<any>();
  private SubReiniciar: Subject<any> = new Subject<any>();

  constructor(
      private route: Router,
  ){
      this.socket.on(socketConst.ENTRAR_GAME, (data: any) =>{
          this.subData.next(data);
      })

      this.socket.on(socketConst.VOTAR_GAME, (data: any) =>{
          this.SubVote.next(data);
      });

      this.socket.on(socketConst.VIRAR_CARD, (data: any) =>{
          this.SubVirar.next(data);
      })

      this.socket.on(socketConst.REINICIAR_GAME, (data: any) =>{
          this.SubReiniciar.next(data);
      })
  }

  async criarSessao(data: any){
      return await new Promise((resolve, reject) =>{
          this.socket.emit(socketConst.CRIAR_GAME, data)
          this.route.navigate([`admin/estimate/${data.idSala}`])
      })
  }

  async entrarSessao(data: any){
      return await new Promise((resolve, reject) =>{
          this.socket.emit(socketConst.ENTRAR_GAME, data)
          this.route.navigate([`admin/estimate/${data.idSala}`])
      })
  }

  async votar(data: any){
      return await new Promise((resolve, reject) =>{
          this.socket.emit(socketConst.VOTAR_GAME, data)
      })
  }

  async virar(data: any){
      return await new Promise((resolve, reject) =>{
          this.socket.emit(socketConst.VIRAR_CARD, data)
      })
  }

  async restart(data: any){
      return await new Promise((resolve, reject) =>{
          this.socket.emit(socketConst.REINICIAR_GAME, data);
      })
  }

  GetVote(){
      return this.SubVote.asObservable();
  }

  GetDadosPlayer(){
      return this.subData.asObservable();
  }

  GetStatus(){
      return this.SubVirar.asObservable();
  }

  ReiniciarGame(){
      return this.SubReiniciar.asObservable();
  }
}
