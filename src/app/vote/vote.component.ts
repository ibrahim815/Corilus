import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../_services/card';
import { Estimation } from '../model/Estimation';
import { EstimationService } from '../_services/EstimationService/estimation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from '../_services/socket-io.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Utils from '../utils.ts/utils';
import { EstimationnService } from '../services/estimationn.service';
import { Estimationn } from '../model/story';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-in')),
      transition('inactive => active', animate('500ms ease-out'))
    ])
  ]
})
export class VoteComponent implements OnInit  , OnDestroy {

  estimationn: Estimationn = {
    username: '',
    userStory: '',
    estFinal: '',
  };
  submitted = false;

  room : Estimation = {
    id: 0,
    rName:'',
    suite:'',
  };
  stream=false;
  loading = false;
  Cardfibo: any[] = [0,1,2,3,5,8,13,21,34,55,59, '?'];
  CardSmallFibo: any[] = [0,1,1,2,3,5,8,13,20,40,100, '?'];
  linkClipboard = "";
  idSala: any;
  players: any[] = [];
  visible: boolean = true;
  virado: boolean = true;
  admin: any;
  tipo: any;
  sala: any;
  media: any;
  flip: string = 'active';
  reverse: string = 'inactive';
  verifica: boolean = false;
  clickedIndex: any;
  travarCarta: any;
  cafe: boolean = false;
  currentUser: any;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  idsal:''

  inviterForm: FormGroup;
  msg: any;
  username: any;
  constructor(private estimationService: EstimationService,
    private fb:FormBuilder,
    public http: EstimationService,
    private clipboardService: ClipboardService,
    private Route: ActivatedRoute,
    private router: Router,
    private socketIoService: SocketIoService,
     private token: TokenStorageService,
     private route: ActivatedRoute,
     private toastService:ToastrService,
     private estimationnService:EstimationnService){



   }
  ngOnDestroy(): void {
    localStorage.clear();
  }

   ngOnInit(): void {
    
    this.Route.params.subscribe((data: any) =>{
      this.idSala = data.id
      this.linkClipboard = "http://localhost:4200/"+data.id;
      this.currentUser = this.token.getUser();

    this.msg =  this.route.snapshot.paramMap.get('id');
    })

    if(localStorage.getItem('userName') !=undefined){
      this.admin = localStorage.getItem('admin');

      this.socketIoService.GetDadosPlayer().subscribe((data:any) =>{
        if(data.idSala = this.idSala){
          this.sala = data.nomeSala;
          this.tipo = data.tipoCarta;
          this.players = [];
          data.players.forEach(element => {
            if(element.player == localStorage.getItem('userName')){
              this.travarCarta = element.travarCarta;
            }
            this.players.push(element)
          });
        }
      });

      this.socketIoService.GetVote().subscribe((data: any) =>{
        debugger
        this.players = [];
        this.virado = true;
        this.players = data.players;
      })

      this.socketIoService.GetStatus().subscribe((data: any) =>{
        this.travarCarta = data.travarCarta;
        this.virado = data.virar;
        this.media = data.media;
      })

      this.socketIoService.ReiniciarGame().subscribe((data: any) =>{
        this.players = data.players;
        this.media = undefined;
        this.clickedIndex = null;
      })

    }else{
      this.router.navigate([`${this.idSala}`])
    }
  }
  members() : FormArray {
    return this.inviterForm.get("members") as FormArray
  }
  newMember(): FormGroup {
    return this.fb.group({
      email: '',
      username: '',
    })
  }
  saveEstimationn(): void {
  
 
    const data = {
      
    username: this.currentUser.username,
      userStory: this.estimationn.userStory,
      estFinal : this.estimationn.estFinal
    };

    this.estimationnService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  removeMember(i:number) {
    this.members().removeAt(i);
  }


  votar(card: any,i){
    this.clickedIndex = i;
    this.visible = false;
    this.virado = true;
    var data = {
      voto: card,
      idSala: this.idSala,
      player: localStorage.getItem('userName'),
      virado: true
    }
    this.socketIoService.votar(data);
  }
  virarCartas(){
    this.verifica = true;
    this.media = 0;
    this.players.forEach(element => {
      this.media = this.media + element.carta
    });

    if(this.media!=0){
      this.media = this.media/this.players.length;
      this.media = this.media.toFixed(2);
    }

    this.socketIoService.virar({idSala: this.idSala, virar: false, media: this.media, travarCarta: this.travarCarta});
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  reiniciarGame(){
    this.cafe = false
    this.clickedIndex = null;
    this.socketIoService.restart(this.idSala)
  }

  inviter(){
    console.log("id = ", this.msg);
    this.router.navigate(['/admin/invite-members']);
  }
  getRoomById() {
    this.estimationService.getEstimationById().subscribe(data => {
      console.log('gfhsjfdkhgljmk',data)
      this.room = data
    });  }

    public createRoom(): void {
      this.stream=true;
      const roomId = Utils.genRoomId();
      window.open(`/call/${roomId}`);
      
    }
    public join(): void {
      const roomId = Utils.genRoomId();
      this.router.navigateByUrl(`/call/${roomId}`)
    }
    register() {
      let lien = '';
      let user = {
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        lien : "localhost:4200/"+this.msg
      }
      this.http.sendEmail("http://localhost:4000/sendmail", user).subscribe(
        data => {
          let res:any = data;
          console.log(
            ` ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}et ${lien}`,

          );

        },
        err => {
          console.log(err);
          this.loading = false;
          //this.buttionText = "Submit";
        },() => {
          this.loading = false;
          //this.buttionText = "Submit";
        }
        );

this.toastService.success('Membre invité avec succès avec Succes','Nouvelle invitation');
      }

      onCancel()
      {
        this.router.navigate(['admin/estimation-rooms']);

      }
      onSubmit() {
        console.log(this.inviterForm.value);
      }
      addMember() {
        this.members().push(this.newMember());
      }
}
