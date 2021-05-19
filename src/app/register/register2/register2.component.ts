import { Component, OnInit } from '@angular/core';
import { RegisterService } from './../register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var SqPaymentForm: any;
@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  myForm: FormGroup;
  registerJson: {};
  registerTempJson: {};
  submitted = false;
  planAmount = 0;
  planType;
  activePlan1 = false;
  activePlan2 = false;
  paymentForm;
  paymentJson: {};
  showLoader = false;
  postalCode = false;
  cardNumber = false;
  cvv = false;
  expirationDate = false;
  postalCodeValid = false;
  cardNumberValid = false;
  cvvValid = false;
  expirationDateValid = false;
  successContent = '';
  errorContent = '';

  constructor(private registerService: RegisterService, private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.registerTempJson = this.registerService.getRegisterJson();
    if(Object.keys(this.registerTempJson).length === 0){
      this.router.navigate(['/register']);
    }
    this.myForm = new FormGroup({
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required)
    });

    this.initializePaymentForm();

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  initializePaymentForm() {
    this.paymentForm = new SqPaymentForm({
      // Initialize the payment form elements

      //TODO: Replace with your sandbox application ID
      applicationId: "sandbox-sq0idb-lSnu00pKgwWIMXwfw0BaxQ",
      inputClass: 'sq-input',
      autoBuild: false,
      // // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '18px',
        fontWeight: '600',
        lineHeight: '24px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
        color: '#3a3b3c',
        padding: '14px'
      }],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number'
      },
      cvv: {
        elementId: 'sq-cvv'
      },
      expirationDate: {
        elementId: 'sq-expiration-date'
      },
      postalCode: {
        elementId: 'sq-postal-code'
      },
      // SqPaymentForm callback functions
      callbacks: {

        paymentFormLoaded: (function () {
          this.showLoader = false;
        }).bind(this),
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: (function (errors, nonce, cardData) {
          errorMessage: String;
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:'+JSON.stringify(errors));
            let thisObj = this;
            errors.forEach(function (error) {
              //console.error('  ' + error.message);
              //alert(error.message);
              if(error.field === 'postalCode'){
                thisObj.postalCodeValid = true;
              }else if(error.field === 'cardNumber'){
                thisObj.cardNumberValid = true;
              }else if(error.field === 'cvv'){
                thisObj.cvvValid = true;
              }else if(error.field === 'expirationDate'){
                thisObj.expirationDateValid = true;
              }
            });
            this.showLoader = false;
            //alert('Encountered errors, check browser developer console for more details');
            return;
          }
          //TODO: Replace alert with code in step 2.1
          console.log(`The generated nonce is:\n${nonce}`);
          this.submitPayment(nonce);
        }).bind(this),

        inputEventReceived: (function (inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              //console.log("inputEvent" + JSON.stringify(inputEvent));
              if(inputEvent.field === 'postalCode'){
                this.postalCode = false;
                this.postalCodeValid = false;
              }else if(inputEvent.field === 'cardNumber'){
                this.cardNumber = false;
                this.cardNumberValid = false;
              }else if(inputEvent.field === 'cvv'){
                this.cvv = false;
                this.cvvValid = false;
              }else if(inputEvent.field === 'expirationDate'){
                this.expirationDate = false;
                this.expirationDateValid = false;
              }
              break;
            case 'focusClassRemoved':
              if(inputEvent.field === 'postalCode' && inputEvent.currentState.isEmpty === true){
                this.postalCode = true;
              }else if(inputEvent.field === 'cardNumber' && inputEvent.currentState.isEmpty === true){
                this.cardNumber = true;
              }else if(inputEvent.field === 'cvv' && inputEvent.currentState.isEmpty === true){
                this.cvv = true;
              }else if(inputEvent.field === 'expirationDate' && inputEvent.currentState.isEmpty === true){
                this.expirationDate = true;
              }
              break;
          }
        }).bind(this)
      }
    });
    this.paymentForm.build();
  }

  onSubmit(form: FormGroup,content,errorContent) {
    this.successContent = content;
    this.errorContent = errorContent;
    this.submitted = true;

    if (form.valid) {
      this.showLoader = true;
      this.registerJson = { ...this.registerService.getRegisterJson(), ...this.myForm.value, "planAmount": this.planAmount, "planType": this.planType };
      //this.registerService.setRegisterJson(this.registerJson);
      console.log("registerJson" + JSON.stringify(this.registerJson));
      this.paymentForm.requestCardNonce();
    }
  }

  submitPayment(nonce) {    
    this.paymentJson = { "nonce": nonce, "amount": this.planAmount };
    this.registerService.checkUser({"emailId":this.registerJson["email"]}).subscribe((userData) =>{
      if(userData["status"] === 200){
        this.registerService.paymentService(this.paymentJson).subscribe((data) => {
          if (data["status"] === 200 && data["result"]["payment"] && data["result"]["payment"]["status"] === "COMPLETED") {
            this.registerService.registerUserDetails(this.registerJson).subscribe((registerData) => {
              this.showLoader = false;
              //alert("Registration Successful.");
              this.open(this.successContent);
              setTimeout(() => {
                this.modalService.dismissAll();
                this.router.navigate(['/login']);
              }, 5000);
            });
          } else {
            this.showLoader = false;
            //alert("Failed to register.Please try again");
            this.open(this.errorContent);
            setTimeout(() => {
              this.modalService.dismissAll();
              this.router.navigate(['/register']);
            }, 5000);
          }
        });
      }else{
        localStorage.setItem('checkUser', "true");
        this.router.navigate(['/login']);
      }
    });
  }

  selectPaymentPlan(amount, planType) {
    this.planAmount = amount
    if (planType === 'plan1') {
      this.activePlan1 = true;
      this.activePlan2 = false;
      this.planType = 'M';
    } else {
      this.activePlan1 = false;
      this.activePlan2 = true;
      this.planType = 'Y';
    }
  }

}
