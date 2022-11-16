import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { EstimationService } from '../_services/EstimationService/estimation.service';
import { Estimation } from '../model/Estimation';
import { ToastrService } from 'ngx-toastr';
import  { VoteComponent } from '../vote/vote.component';
@Component({
  selector: 'app-inviter',
  templateUrl: './inviter.component.html',
  styleUrls: ['./inviter.component.scss']
})
export class InviterComponent implements OnInit {
  @Input ('msg')
  msg: any;
  room : Estimation = {
    id: 0,
    rName:'',
    suite:'',
  };

  lien = '';
  loading = false;
  buttionText = "Submit";
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  inviterForm: FormGroup;



  constructor(private fb:FormBuilder, private router:Router, public http: EstimationService,
    private estimationService: EstimationService,
    private route: ActivatedRoute,private toastService:ToastrService) {

    this.inviterForm = this.fb.group({
      members: this.fb.array([]) ,
    });
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
  addMember() {
    this.members().push(this.newMember());
  }

  removeMember(i:number) {
    this.members().removeAt(i);
  }

  onSubmit() {
    console.log(this.inviterForm.value);
  }
  onCancel()
  {
    this.router.navigate(['admin/estimation-rooms']);

  }

  ngOnInit(): void {


    this.msg =  this.route.snapshot.paramMap.get('idSala');
  }


  register() {

    this.loading = true;
    this.buttionText = "Submiting...";
    console.log("id = ", this.msg);
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
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
      );

      this.toastService.success('Membre invité avec succès avec Succes','Nouvelle invitation');
    }

}
