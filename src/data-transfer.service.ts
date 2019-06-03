import { Injectable } from '@angular/core';

@Injectable()
export class DataTransferService {

  quizId:number = 0;
  data:Array<Object> = [];
  name;

  setData(data: Array<Object>) {
    this.data = data;
  }

  getData() {
    return this.data;
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