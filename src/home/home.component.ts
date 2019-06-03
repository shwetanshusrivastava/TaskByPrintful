import { Component, OnChanges, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 selectedQuize:Object;
  name = "";
  quizes:Array<Object> = [];

  constructor(private httpService: HttpClient, private router: Router,
  private datatransferService:DataTransferService) {

  }

  ngOnInit() {
    this.getQuizes()
    .subscribe((data: Array<Object>) => this.quizes = data);
  }

  getQuizes() {
    return this.httpService.get("https://printful.com/test-quiz.php?action=quizzes");
  }

  ngOnChanges() {

  }

  start() {
    this.datatransferService.setName(this.name);
    this.router.navigate(['/questions',this.selectedQuize['id']]);
  }

  ngOnDestroy() {
    
  }

}