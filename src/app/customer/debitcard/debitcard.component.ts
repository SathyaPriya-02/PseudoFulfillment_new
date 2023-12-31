import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-debitcard',
  templateUrl: './debitcard.component.html',
  styleUrls: ['./debitcard.component.css']
})
export class DebitcardComponent {

  price: any;
  planname : any
  validity : any
  phonenumber : any
  username : any
  userDetails : any
  planSelected : any
  simnumber : any
  tid : any
  billdetails : any
  expiredate :any
  emailid: any;
  prowallet: any;
  dialog: any;
  
  constructor(private router : Router ,private us : UserService) {
    this.userDetails = sessionStorage.getItem("loginUserDetails");
    if (this.userDetails) {
    this.userDetails = JSON.parse(this.userDetails);
    console.log(this.userDetails);
  // Rest of your code to access userDetails properties
}
    console.log(this.userDetails)
    this.phonenumber = this.userDetails.phonenumber
    this.username = this.userDetails.first_name
    this.simnumber = this.userDetails.simnumber
    this.emailid = this.userDetails.emailid
    this.prowallet = this.userDetails.prowallet
    console.log("walletttttttttttt"+this.prowallet)
    this.planSelected = sessionStorage.getItem("selectedPlan");

    if (this.planSelected) {
      this.planSelected = JSON.parse(this.planSelected);
      console.log(this.planSelected);
      // Rest of your code to access planSelected properties
    } 
    this.planname = this.planSelected.planname
    this.price = this.planSelected.price
    this.validity = this.planSelected.validity
  }

  

  makePayment()
  {
      this.us.recharge(this.username, this.emailid,this.simnumber,this.phonenumber,this.planname, this.price, this.validity).subscribe(
        (response)=> {this.tid = response ;
        console.log("tid"+this.tid)
        this.us.findByTid(this.tid).subscribe((response)=> {this.billdetails=response
          console.log(this.billdetails)
          this.username = this.billdetails.firstname
          this.phonenumber = this.billdetails.phonenumber
          this.planname = this.billdetails.planname
          this.price = this.billdetails.price
          this.validity = this.billdetails.validity
          this.expiredate = this.billdetails.expiredate
          this.emailid = this.billdetails.emailid

          this.us.generateBill(this.username,this.emailid,this.phonenumber,this.planname,this.price,this.validity,this.tid,this.expiredate).subscribe()
          sessionStorage.setItem("recharge-tid",this.tid)
          this.router.navigate(['/recharge-success']);
          this.us.updateWalletAmount(this.phonenumber, this.prowallet).subscribe()
        })  
      });
     

      
  }
  rechargeAmount  : any
  walletAmount : any 
  updateTotalAmount() {
     this.rechargeAmount = this.price;  // Replace with your actual recharge amount
     this.walletAmount = this.prowallet; // Replace with the fetched wallet amount
    console.log("prowallet: " + this.walletAmount);

    if (this.prowallet >= this.rechargeAmount) {
        // If wallet balance is sufficient, use the wallet balance as the total amount
        
         this.prowallet = this.walletAmount - this.rechargeAmount
         this.price=0
         console.log(this.price);
         
         

    } else if (this.walletAmount >= this.rechargeAmount) {
      Swal.fire({
          icon: 'error',
          title: 'Insufficient Balance',
          text: 'Your wallet balance is insufficient. Please recharge your wallet.',
          showCancelButton: false,
          confirmButtonText: 'OK',
      }).then((result) => {
          // Uncheck the checkbox and restore the old balance if it was sufficient
          if (result.isConfirmed) {
              this.prowallet = this.walletAmount;
              // Uncheck the checkbox
              // You can use JavaScript to find and uncheck the checkbox, but it's typically done through Angular binding
              // Here's an example of how to do it with Angular:
              // this.isCheckboxChecked = false;
          }
      });
  }
}

cancelPayment() {
  const confirmCancel = window.confirm('Do you want to cancel the payment?');
  if (confirmCancel) {
    this.router.navigate(['/user']);
  }
}



}

