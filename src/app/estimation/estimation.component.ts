import { Component, OnInit } from '@angular/core';
import { Estimation } from '../model/Estimation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstimationService } from '../_services/EstimationService/estimation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketIoService } from '../_services/socket-io.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { EstimationnService } from '../services/estimationn.service';
@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit {
  currentEstimationn = null;
  currentIndex = -1;
  currentUser: any;
  nomeUsuario: any;

  pageOfItems!: Array<any>;
  mode = 'list';
  searchText: any;
  est:Estimation={};
  estimationlist!:Estimation[];

  p: number = 1;
  total: number = 0;

  loading = false;
  estimationns: any;

  currentEstiamtionn = null;
  constructor(private router:Router,
    private socketIoService: SocketIoService,
    private formBuilder: FormBuilder,
    private estimationService:EstimationService,
    private toastService:ToastrService,
    private token: TokenStorageService,
    private estimationnService: EstimationnService) { }

    formCriaSessao: FormGroup = this.formBuilder.group({

      nomeSala: [null, Validators.required],
      tipoCarta: [null, Validators.required],
      espectador: [false]
    })
    formEntrarSessao: FormGroup = this.formBuilder.group({
      nomeUsuario: ['', Validators.required],
      idSala: ['', Validators.required],
      espectador: [false]
    })
  ngOnInit(): void {
    localStorage.clear();
    this.getAllEstimations();
    this.currentUser = this.token.getUser();
    this.retrieveEstimationn();
  
}




  criarSessao(){
    localStorage.setItem('userName', this.currentUser.username)
    localStorage.setItem('admin', 'true');

    var sala = {
      nomeUsuario: this.currentUser.username,
      nomeSala: this.formCriaSessao.value.nomeSala,
      tipoCarta: this.formCriaSessao.value.tipoCarta,
      espectador: this.formCriaSessao.value.espectador,
      idSala: this.uuid()
    }
    this.socketIoService.criarSessao(sala)
  }

  entrarSessao(){
    localStorage.setItem('userName', this.formEntrarSessao.value.nomeUsuario)
    var sessao = {
      nomeUsuario: this.formEntrarSessao.value.nomeUsuario,
      idSala: this.formEntrarSessao.value.idSala,
      travarCarta: this.formEntrarSessao.value.espectador
    }
    this.socketIoService.entrarSessao(sessao)
  }

  uuid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  retrieveEstimationn(): void {
    this.estimationnService.getAll()
      .subscribe(
        data => {
          this.estimationns   = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  setActiveTutorial(estimationn, index): void {
    this.currentEstimationn = estimationn;
    this.currentIndex = index;
  }









  getAllEstimations() {
    this.estimationService.getEstimation()
    .subscribe(data=>{
      this.estimationlist=data;
    });
  }
  onEdit(id?: number)
  {
    console.log("id = ", id);
    this.estimationnService.getId(id);
  ;
  }
  
  OnDeleteEstimation(id? : number) 
  {
    if (confirm("Are you sure you want to delete this ?")) {
   this.estimationnService.deleteEstimation(id).subscribe();
   this.toastService.info('Utilisateur supprimé avec succès', ' Utilisateur supprimé');
   window.location.reload();


  }}

  pageChangeEvent(event: number){
    this.p = event;
    this.getAllEstimations();
  }

  onNewEstimation(){
    if (this.mode != 'new-estimation') {
      this.mode = 'new-estimation';
    } else {
      this.mode = 'list';
    }
  }

  saveEstimation(): void{
    this.estimationService.createEstimation(this.est)
    .subscribe(data=>{console.log(data);
    this.goToEstimationList();
    this.toastService.success('Salle créée avec Succes','Nouvelle Salle');},

    ex => {
      console.log(ex);

      this.toastService.error(ex.error.error);
    });
  }
  goToEstimationList() {
    this.router.navigate(['admin/estimation']);
    window.location.reload();
  }

  onDeleteEstimation(id? : number){
    this.estimationService.deleteEstimation(id).subscribe();
    this.router.navigate(['admin/estimation']);
    window.location.reload();
  }

  onSubmit(){
    console.log(this.est);
    this.saveEstimation();
  }
  onCancel()
  {
    this.mode='list';

  }

 updateEstimation(idSalle? : number){
    console.log("id = ", idSalle);
    this.estimationService.getId(idSalle);
    this.router.navigate(['/admin/update-estimation-room']);
  }

 rejoindre(idSalle? : number){
    console.log("id = ", idSalle);
    this.estimationService.getId(idSalle);
    this.router.navigate([`/admin/estimate/${idSalle}`]);
  }
 
}
