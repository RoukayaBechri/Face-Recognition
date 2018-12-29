import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mheader',
  templateUrl: './mheader.component.html',
  styleUrls: ['./mheader.component.css']
})
export class MheaderComponent implements OnInit {
 
  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
 
}