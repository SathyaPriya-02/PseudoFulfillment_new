import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-starter-activate',
  templateUrl: './starter-activate.component.html',
  styleUrls: ['./starter-activate.component.css']
})
export class StarterActivateComponent {

  phonenumber : any
  UserDetail : any
  planname : any
  validity : any
  price : any
  username : any
  simnumber : any
  transactionId = '';
  activationSuccess = false;
  emailid : any
  


  constructor(private us: UserService, private router : Router) {
    // Retrieve the 'activatedUserDetail' string from session storage and parse it as JSON
    const activatedUserDetailString = sessionStorage.getItem("activatedUserDetail");
    if (activatedUserDetailString) {
      this.UserDetail = JSON.parse(activatedUserDetailString);
      console.log(this.UserDetail)
      // Now you can access properties of UserDetail, including 'phonenumber'
      this.phonenumber = this.UserDetail.phonenumber;
      console.log(this.phonenumber)
      this.simnumber = this.UserDetail.simcardnumber
      console.log(this.simnumber)
      this.emailid = this.UserDetail.user.emailid;
      this.username = this.UserDetail.user.firstName;
      console.log(this.emailid)
      console.log(this.username)
      
    }

    // Other property assignments

    this.planname = sessionStorage.getItem("firstplan");
    this.validity = sessionStorage.getItem("validity");
    this.price = sessionStorage.getItem("price");
    

  }

  

  activate()
  {
    
    console.log(this.phonenumber)
    
    this.us.activateUser(this.username,this.emailid,this.simnumber,this.phonenumber,this.planname,this.price,this.validity).subscribe(
      (response: any) => {
        
        this.transactionId = response
        sessionStorage.setItem("tid",this.transactionId)
        this.activationSuccess = true;
        this.us.activateBill(this.username,this.emailid,this.simnumber,this.phonenumber,this.planname,this.price,this.validity,this.transactionId).subscribe()
        this.router.navigate(['/activation-success']);
      }
    );
    
  }

  cancelPayment() {
    const confirmCancel = window.confirm('Do you want to cancel the payment?');
    if (confirmCancel) {
      this.router.navigate(['/starter-recharge']);
    }
  }
}
