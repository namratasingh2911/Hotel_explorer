import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private hotelService : HotelService) { }

  ngOnInit() {
  }

  onSubmit(f : NgForm){
   const location= f.value.location;
   const startDate=f.value.startDate;
   const endDate=f.value.endDate;
   this.hotelService.getStatus(location,startDate,endDate)



  }

}
