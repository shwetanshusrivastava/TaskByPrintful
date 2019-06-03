import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { ResultComponent } from '../result/result.component';
import { HomeComponent } from '../home/home.component';
import { QuestionComponent } from '../question/question.component';

import { DataTransferService } from '../data-transfer.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, RoutingModule ],
  declarations: [ AppComponent, HelloComponent, QuestionComponent, HomeComponent, ResultComponent],
  providers: [DataTransferService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
