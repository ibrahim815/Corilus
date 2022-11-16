import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../_services/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

@Input()
public data:Card|null=null;

@Input()
public flipped:boolean=true;


  constructor() { 
   
  }

  toggleFlip(){
    this.flipped= !this.flipped;
  }

  ngOnInit(): void {
  }

}
