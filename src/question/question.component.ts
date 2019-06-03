import { Component, OnChanges, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataTransferService } from '../data-transfer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  cname = '';
  quesURL = 'https://printful.com/test-quiz.php?action=questions&quizId=';
  // id: number = 141; // TODO: Correct parameterised routing
  quizId: number = 0;
  private sub: any;
  private currentQuestionNo: number;
  private currentQuestion: Object;

  questions:Array<Object> = [];
  options:Array<Object> = [];

  constructor(private httpService: HttpClient, private router: Router,     private route: ActivatedRoute, private datatransferService:DataTransferService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.quizId = +params['id']; // (+) converts string 'id' to a number
    }); 
    
    this.getQuestions()
    .subscribe((data: Array<Object>) => {
      this.questions = data;
      this.currentQuestionNo = data.length > 0 ? 1 : 0;
      this.currentQuestion = data.length > 0 ? data[0] : null;
      console.log(this.currentQuestion);
          this.getAnswerOptions(this.currentQuestion.id)
        .subscribe((data: Array<Object>) => {
          this.options = data;
         
        });
      });
       
    
    

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getQuestions() {
    return this.httpService.get(this.quesURL + this.quizId);
  }

  getAnswerOptions(questionId) {
     return this.httpService.get('https://printful.com/test-quiz.php?action=answers&quizId='+this.quizId+'&questionId='+questionId);
  }
  ngOnChanges() {

  }

//for checkboxes
checkedList:Array<Object> = [];
onCheckboxChange(option, event) {
     if(event.target.checked) {
       this.checkedList.push(option.id);
     } else {
     for(var i=0 ; i < this.options.length; i++) {
       if(this.checkedList[i] == option.id) {
         this.checkedList.splice(i,1);
      }
    }
  }
  console.log(this.checkedList);
}

get debug3() { 
    return JSON.stringify(this.checkedList); 
    
  }

  get debug4() { 
    return JSON.stringify(this.selectedAnswers); 
    
  }

width:number = (100*this.currentQuestionNo)/ this.questions.length;

selectedAnswers:Array<Object> = [];

//Click Next After selecting answers
next() {
  if(this.checkedList.length) {
      console.log(this.checkedList);
      for(let j=0 ; j < this.checkedList.length; j++) {
        this.selectedAnswers.push(this.checkedList[j]);
       }
      // this.selectedAnswers.push(this.checkedList);
      this.checkedList = [];
      this.datatransferService.setQuizId(this.quizId);
      this.datatransferService.setMultiChoiceData(this.selectedAnswers);

        this.width = (100*this.currentQuestionNo)/ this.questions.length;

        if(this.currentQuestionNo < this.questions.length){
        this.currentQuestionNo++;
        this.currentQuestion = this.questions[this.currentQuestionNo-1];
          this.getAnswerOptions(this.currentQuestion.id)
          .subscribe((data: Array<Object>) => {
            this.options = data;
          
          });
      } else {
        this.router.navigateByUrl('/result');
      }
  }else{
    alert("choose one option");
  }
}
  
}