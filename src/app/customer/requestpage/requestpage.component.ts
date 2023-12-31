import { Component } from '@angular/core';
import { requestusers } from 'src/app/model/requestusers';

import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './requestpage.component.html',
  styleUrls: ['./requestpage.component.css']
})
export class RequestpageComponent {

//       user : requestusers = new requestusers('','','','','','','','','','','');
//       submitted: boolean = false;
//       simCount: number=1;
//  simData: { sim: string, address: string }[] = [];
      
      

      

      // onSubmit()
      // {
      //   console.log("Registered user"+this.user.emailid)
      //   //sending regisstered emailid to backend to send activation link in mail 
      //   this.uservice.sendMail(this.user.emailid).subscribe((response)=>
      //   { 
      //     //getting phonenumber and simnumber generated in backend
      //     this.user.phonenumber = response.phoneNumber;
      //     this.user.simnumber = response.simNumber;
      //     console.log("phn "+this.user.phonenumber);
      //     console.log("sim "+this.user.simnumber);
      //     //sending all the details to store in db
      //     this.uservice.addUser(this.user).subscribe((response)=>{this.submitted=true});
      //     console.log("Stored details "+this.user);
      //     console.log("hi")
      //   });
        
      // }


     
    
   
    

  constructor(private uservice : UserService){}

  user : requestusers = new requestusers('','','','','',1);
  simAddress : string [] = []; 
  simData: string[] = []; // Initialize an empty array to store addresses
  currentAddress: string = ''; 


  
  addSim() {
    if (this.user.simCount < 4) {
      Swal.fire({
        title: 'Add New SIM',
        input: 'text',
        inputPlaceholder: `Enter the delivery address for SIM ${this.user.simCount + 1}`,
        inputValidator: (value) => {
          if (!value) {
            return 'Address is required';
          }
          return null;
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        confirmButtonColor: 'red', // Set the button color to red
      }).then((result) => {
        if (result.isConfirmed) {
          const newAddress = result.value;
          if (newAddress) {
            this.simData.push(newAddress);
            this.user.simCount++;
          }
        }
      });
      
    }
  }
      
    
  removeSim(index: number) {
      this.simData.splice(index, 1);
      this.user.simCount--;
  }

  onSubmit() {
   
    console.log(this.user)
    this.simAddress = [];
    for (const address of this.simData) {
      if (address.trim() !== '') {
        this.simAddress.push(address);
      }
    }
    
    if (this.currentAddress.trim() !== '') {
      this.simAddress.push(this.currentAddress);
    }
    
    
    console.log(this.simAddress);
    

    this.uservice.submitUserData(this.user,this.simAddress).subscribe(
        (response) => {
          Swal.fire({

            title: 'Registration Success',
          
            icon: 'success',
          
            showCancelButton: true,
          
            confirmButtonText: 'Return to Home',
          
            cancelButtonText: 'Login your account',
          
          }).then((result) => {
          
            if (result.isConfirmed) {
          
              // Handle the "Return to Home" action
          
              window.location.href = ''; // Replace '/home' with the actual URL of your home page.
          
            } else if (result.dismiss === Swal.DismissReason.cancel) {
          
              // Handle the "Login your account" action
          
              window.location.href = '/login'; // Replace '/login' with the actual URL of your login page.
          
            }
          
          });
        });
}




}
