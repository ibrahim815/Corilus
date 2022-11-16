import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estimation } from '../model/Estimation';
import { EstimationService } from '../_services/EstimationService/estimation.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-reunion',
  templateUrl: './update-reunion.component.html',
  styleUrls: ['./update-reunion.component.scss']
})
export class UpdateReunionComponent implements OnInit {
  est : Estimation = {
    rName:'',
    suite:'',
  };
  mode = 'list';
  constructor(private estimationService:EstimationService, private router:Router, private toastService:ToastrService) { }

  ngOnInit(): void {
    this.getRoomById(); 

  }
  onCancel()
  {
    this.mode='list';
    this.router.navigate(['admin/estimation-rooms']);


  }
  getRoomById() {
    this.estimationService.getEstimationById().subscribe(data => {
      this.est = data;
    });  }

    updateRoom(id?:number){
    
      console.log(this.est);
      this.estimationService.updateEstimation(this.est).subscribe();
      this.router.navigate(['admin/estimation-rooms']);
      this.toastService.success('Salle modifiée avec Succes','Success');
}

}
