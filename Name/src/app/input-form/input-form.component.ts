import { WebRequestService } from './../web-request.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  nameForm;
  captchaPassed: boolean = false;
  private captchaResponse: string;
  displayResponse : boolean = false;


  constructor(private WebRequestService: WebRequestService,private formBuilder: FormBuilder, private zone: NgZone) {
    this.nameForm = this.formBuilder.group({
      firstName: '',
      lastName: ''
    });
  }

  submitName(firstName: string, lastName: string){
    this.WebRequestService.postStudent({'firstName': firstName, 'lastName': lastName}).subscribe();
  }

  validateRecaptcha(){
    let data = {
      captchaResponse: this.captchaResponse
    };
    this.WebRequestService.postRecaptcha(data).subscribe(res => console.log(res));
  }

  onSubmit(name) {
    this.validateRecaptcha();
    this.submitName(name.firstName, name.lastName);
    this.displayResponse = true;
    this.nameForm.reset();

  }

  resolved(response: string): void {
    this.zone.run(() => {
        this.captchaPassed = true;
        this.captchaResponse = response;
    });
  }

  ngOnInit(): void {
  }

}
