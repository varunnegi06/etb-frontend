import { Component, OnInit } from '@angular/core';
import { RegisterService } from './../register.service';
import { Router } from '@angular/router';

declare var SqPaymentForm : any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm;
  registerJson:{};
  planAmount:String;
  paymentJson:{};
  showLoader=true;

  constructor(private registerService: RegisterService,private router:Router) { }

  ngOnInit(): void {
    this.registerJson = this.registerService.getRegisterJson();
    if(Object.keys(this.registerJson).length === 0){
      this.router.navigate(['/register']);
    }
    //console.log("registerJson"+JSON.stringify(this.registerJson));
    this.planAmount = this.registerJson["planAmount"];
    this.showLoader=true;
    this.initializePaymentForm();
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
        fontSize: '16px',
        lineHeight: '24px',
        placeholderColor: '#a0a0a0',
        backgroundColor: 'transparent',
      }],
      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: 'Card Number'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
      },
      // SqPaymentForm callback functions
      callbacks: {

        paymentFormLoaded: (function() {
          this.showLoader=false;
        }).bind(this),
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
        cardNonceResponseReceived: (function (errors, nonce, cardData) {
          errorMessage :String;
          if (errors) {
            // Log errors from nonce generation to the browser developer console.
            //console.error('Encountered errors:');
            errors.forEach(function (error) {
              //console.error('  ' + error.message);
              alert(error.message);
            });
            this.showLoader=false;
            //alert('Encountered errors, check browser developer console for more details');
            return;
          }
          //TODO: Replace alert with code in step 2.1
          //console.log(`The generated nonce is:\n${nonce}`);
          this.submitPayment(nonce);
        }).bind(this)
      }
    });
    this.paymentForm.build();
  }

  onSubmit() {
    this.showLoader=true;
    // Request a nonce from the SqPaymentForm object
    this.paymentForm.requestCardNonce();
  }

  submitPayment(nonce){
    this.paymentJson = { "nonce": nonce, "amount": this.planAmount};
    this.registerService.paymentService(this.paymentJson).subscribe((data) => {
      //console.log(" data " + JSON.stringify(data));
      if(data["status"] === 200 && data["result"]["payment"] && data["result"]["payment"]["status"] === "COMPLETED"){
        this.registerService.registerUserDetails(this.registerJson).subscribe((registerData) => {
          //console.log(" registerData " + JSON.stringify(registerData));
          this.showLoader=false;
          alert("Registration Successful.");
          this.router.navigate(['/login']);
        });
      }else{
        this.showLoader=false;
        alert("Failed to register.Please try again");
        this.router.navigate(['/register']);
      }
    });
  }

}
