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

formParams:Array<Object> = [];
selectedEntry;
radioChecked:boolean = false;
onSelectionChange(selectedOption) {
  // this.selectedEntry.id = selectedOption
  this.selectedEntry = selectedOption;
  // this.selectedEntry.quesId = this.currentQuestion.id;
  // this.selectedEntry.optionSelected = selectedOption.id;
  // alert(selectedOption.id);
  this.radioChecked = true;
 
  
}

model:any = {};


//  get debug() { 
//     return JSON.stringify(this.model); 
    
//   }

// get debug2() { 
//     return JSON.stringify(this.formParams); 
    
//   }

// 100/questions.length*currentQuestionNo
width:number = (100*this.currentQuestionNo)/ this.questions.length;
  next() {
  
    if(this.radioChecked) {
        this.radioChecked = false;
         this.formParams.push(this.model);
        this.model = {};
        this.datatransferService.setQuizId(this.quizId);
        this.datatransferService.setData(this.formParams);

        this.width = (100*this.currentQuestionNo)/ this.questions.length;

        console.log('>>>>>'+this.width);
        // console.log('#progressBar');
        // ('#progressBar').setStyle('width',this.width+'%');
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

    }else {
      alert('Select one option');
    }
  }
}