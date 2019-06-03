import { Component, OnChanges, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private httpService: HttpClient, private datatransferService:DataTransferService) { }
  name:string = '';
  score:Object = {};
  formParams:Array<Object> = [];
  answerString:string = '';
  quizId:number = 0;
  ngOnInit() {
   this.formParams =  this.datatransferService.getData();
   this.quizId = this.datatransferService.getQuizId();
   this.formParams.forEach(option => {
      console.log(option.options);
      this.answerString += '&answers[]='+option.options;
      console.log(this.answerString)
    })
  this.name = this.datatransferService.getName();
   console.log(this.formParams);
    this.getScore()
    .subscribe((data: Object) => {
        this.score = data;
    }
    );
  }

  getScore() {
     return this.httpService.get('https://printful.com/test-quiz.php?action=submit&quizId='+this.quizId+this.answerString);
  }
}