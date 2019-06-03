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
  
  selectedAnswers:Array<Object> = [];

  answerString:string = '';
  quizId:number = 0;

  ngOnInit() {
      this.selectedAnswers = this.datatransferService.getMultiChoiceData()

      this.quizId = this.datatransferService.getQuizId();

      

      this.selectedAnswers.forEach(option => {
          console.log(option);
          this.answerString += '&answers[]='+option;
          console.log(this.answerString)
        })

      this.name = this.datatransferService.getName();
      
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