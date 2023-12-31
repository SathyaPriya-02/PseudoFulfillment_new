import { Injectable } from '@angular/core';
import { requestusers } from '../model/requestusers';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string ='http://localhost:9191'
  phonenumber : string = '';
  email:string='';
  searchResults: any;

  constructor(private httpClient:HttpClient) { }
  sendMail(email_id: string):Observable<any> 
  {
   return this.httpClient.post('http://localhost:9191/user/sendmail',email_id);
  }

  addUser(newUser : requestusers)
  {
    return this.httpClient.post('http://localhost:9191/user/newuser',newUser);
  }

  generateOtp(phoneNumber:string,email:string)
  {
    const body={phoneNumber,email}
    return this.httpClient.post('http://localhost:9191/requestotp',body)
  }

  validateOtp(otpAndPhoneNumber:any):Observable<Boolean> {
    // Send the entered OTP and phone number to the server for validation
    // console.log(this.httpClient.post<boolean>('http://localhost:8035/validateotp', otpAndPhoneNumber));
    return this.httpClient.post<Boolean>('http://localhost:9191/validateotp', otpAndPhoneNumber);

  }

  getUserDetail(phoneNumber : string)
  {
    
    return this.httpClient.get<requestusers>(`http://localhost:9292/api/users/detail/${phoneNumber}`);
  }
  

  getPlans()
  {
    return this.httpClient.get('http://localhost:9191/user/plan')
  }

  logout()
  {
    localStorage.removeItem("userdata");
    sessionStorage.removeItem("loginUserDetails")
    sessionStorage.removeItem("selectedPlan")
    sessionStorage.removeItem("tid")
    sessionStorage.removeItem("recharge-tid")
  }

  searchPlans(searchText : string)
  {
    return this.httpClient.get(`http://localhost:9191/user/searchplan/${searchText}`)
  }

  activateUser(name : string,emailid: string, simnumber : string ,phoneNumber: string,planName: string, price: number, validity: number) {
    const data = {
      simnumber : simnumber,
      userName: name,
      emailid : emailid,
      planname: planName,
      price: price,
      validity: validity
    };
  
    console.log( this.httpClient.post(`http://localhost:9292/api/users/activate/${phoneNumber}`, data));
    return this.httpClient.post(`http://localhost:9292/api/users/activate/${phoneNumber}`, data)
  }


  recharge(firstName: string, emailid : string, simnumber: string, phoneNumber: string, planName: string, price: number, validity: number) {
    const data = {
      simnumber: simnumber,
      userName: firstName,
      emailid : emailid,
      planname: planName,
      price: price,
      validity: validity
    };
    console.log(phoneNumber); // Use the parameter 'phoneNumber' here
    console.log(data);
    return this.httpClient.post(`http://localhost:9191/user/recharge/${phoneNumber}`, data);
  }
  
  findByTid(tid : string)
  {
    return this.httpClient.get(`http://localhost:9191/user/tid/${tid}`)
  }

  generateBill(firstName: string,emailid : string, phoneNumber: string, planName: string, price: number, validity: number,tid:string,expiredate:string)
  {
    const data = {

      phonenumber : phoneNumber,
      firstname: firstName,
      planname: planName,
      price: price,
      validity: validity,
      expiredate:expiredate,
      transactionid : tid
    };
    console.log(data)
    return this.httpClient.post(`http://localhost:9191/user/generate-bill/${emailid}`, data);
  }

  activateBill(firstName: string,emailid : string,simnumber:string, phoneNumber: string, planName: string, price: number, validity: number,tid:string)
  {
    const data = {

      phonenumber : phoneNumber,
      firstname: firstName,
      planname: planName,
      price: price,
      validity: validity,
      simnumber : simnumber,
      transactionid : tid
    };
    return this.httpClient.post(`http://localhost:9292/user/activation-bill/${emailid}`, data);
  }

  updateWalletAmount(phonenumber : string,prowallet : number)
  {
    return this.httpClient.post(`http://localhost:9191/user/updatewallet/${phonenumber}`, prowallet);
  }

  submitUserData(user: requestusers , location : string[]): Observable<any> {
    const data = {
      user: user,
      location: location
    };
    return this.httpClient.post('http://localhost:9292/api/users/newSimCard', data);
  }
}


