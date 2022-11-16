import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { User } from '../model/user';
import { AuthService } from '../_services/auth.service';
import { UsersService } from '../_services/users.service';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  users!: User[];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gestion du par informatique La Griffe ',
      },
    },
  };
  
  
  a: number = 0;
  c: number = 0;
  d: number = 0;
  e: number =0;
  s:number=0;
  constructor(private usersService:UsersService,
    public auth:AuthService ) { }
   
     ngOnInit(): void {
       this.getAllUsers();
  }
 
   getAllUsers(){
    this.usersService.listeUser().subscribe(data => {
      console.log(data);
      this.users = data;
      this.a = this.users.length;
      console.log(this.a);
      
      this.salesData.datasets.push({ label: 'Users', data: [this.a] },)

    });
   
  }
  salesData: ChartData<'pie'> = {
    labels: ['Users','Tickets', 'Ordinateur','Allocation','Réparation'],
    datasets: [{data: [this.a]}],
    
  };

}




