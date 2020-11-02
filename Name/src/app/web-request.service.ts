import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  constructor(private httpClient: HttpClient) {
  }

  getStudent(){
    return this.httpClient.get(`http://localhost:5000/fetchStudent`);
  }

  postStudent(body: Object){

    return this.httpClient.post(`http://localhost:5000/student`, body);
  }

  postRecaptcha(body: Object){
    return this.httpClient.post(`http://localhost:5000/token_validate`, body);

  }

  sendToken(token){
    return this.httpClient.post<any>("http://localhost:5000/token_validate", {recaptcha: token})
  }
}
