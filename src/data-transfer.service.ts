import { Injectable } from '@angular/core';

@Injectable()
export class DataTransferService {

  quizId:number = 0;
  data:Array<Object> = [];
  multiChoiceData:Array<Object> = [];
  name;

  setData(data: Array<Object>) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setMultiChoiceData(multiChoiceData: Array<Object>) {
    this.multiChoiceData = multiChoiceData;
  }

  getMultiChoiceData() {
    return this.multiChoiceData;
  }

  setName(name : any){
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setQuizId(quizId : number){
    this.quizId = quizId;
  }

  getQuizId() {
    return this.quizId;
  }
}