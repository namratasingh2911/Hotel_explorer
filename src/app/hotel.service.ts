import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http : HttpClient) { }

  getStatus(location:string,startDate:Date,endDate:Date){
    const postData = {
      "currency": "USD",
      "posId": "hbg3h7rf28",
      "orderBy": "price asc, rating desc",
      "roomOccupancies": [
         {
            "occupants": [
               {
                  "type": "Adult",
                  "age": 25
               }
            ]
         }
      ],
      "stayPeriod": {
         "start": startDate,
         "end": endDate //mm/dd/yyyy ( FUTURE DATES )
      },
         "bounds": {
         "circle": {
            "center": {
               "lat": 49.0097, // Selected location lat long
               "long": 2.5479
            },
            "radiusKm": 50.5
         }
      }
   }
   
    this.http.post("https://public-be.oski.io/hotel/v1.0/search/init",postData)
    .subscribe((res)=>{
      console.log(res);
      this.getSession(res);
    })

  }

  getSession(sessionData:any){
     console.log(sessionData);
     let headers = new HttpHeaders();
     let options = {headers : {"oski-tenantId":"Demo"}}

     this.http.post("https://public-be.oski.io/hotel/v1.0/search/status",sessionData,options)
     .subscribe((res)=>{
        let finalRes= JSON.parse(JSON.stringify(res));
        if(finalRes.status=='InProgress'){
           this.getSession(sessionData);
        }
        else {
           let finalId = JSON.parse(JSON.stringify(sessionData))
           console.log('finalId',finalId.sessionId)
           this.getResult(finalId.sessionId)
        }
     })

  }

  getResult(id:string){
   let options = {headers : {"oski-tenantId":"Demo"}}
   const finalData ={
      "sessionId": id,
      "paging": {
         "pageNo": 1,
         "pageSize": 5,
         "orderBy": "price asc, rating desc"
      },
      "optionalDataPrefs": [
         "All"
      ],
      "currency": "USD",
      "contentPrefs": [
         "Basic",
         "Activities",
         "Amenities",
         "Policies",
         "AreaAttractions",
         "Descriptions",
         "Images",
         "CheckinCheckoutPolicy",
         "All"
      ],
      "filters": {
         "minHotelPrice": 1,
         "maxHotelPrice": 10000,
         "minHotelRating": 1,
         "maxHotelRating": 5,
         "hotelChains": [
            "Novotel",
            "Marriott",
            "Hilton",
            "Accor"
         ],
         "allowedCountry": "FR"
      }
   }
   
   
   
   
   
   
   
   
   
   
   
   this.http.post("https://public-be.oski.io/hotel/v1.0/search/results",finalData,options)
   .subscribe((res)=>{
      console.log(res)
   })

  }
}
