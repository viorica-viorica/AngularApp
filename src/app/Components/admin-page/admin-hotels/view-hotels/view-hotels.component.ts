import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HotelModel } from 'src/app/Models/hotel-model/hotel-model.model';
import { HotelServiceService } from 'src/app/Services/hotel-service/hotel-service.service';

@Component({
  selector: 'app-view-hotels',
  templateUrl: './view-hotels.component.html',
  styleUrls: ['./view-hotels.component.css']
})
export class ViewHotelsComponent implements OnInit, OnDestroy {

  constructor(private HotelService: HotelServiceService) { }

  private subcription!: Subscription;
  HotelsList: HotelModel[] = [];
  
  ngOnInit(): void {
    this.refreshHotelsList();
  }

  ngOnDestroy(){
    if (this.subcription){
      this.subcription.unsubscribe;
    }
  }

  deleteItem(hotel: HotelModel) {
    if (confirm('Ești sigur că vrei să ștergi acest hotel?')) {
      this.HotelService.deleteHotel(hotel.hotelId)
        .subscribe(
          res => {
            // this.toastr.error("Deleted successfully");
            this.refreshHotelsList();
          },
          err => { console.log(err) }
        )
    }
  }

refreshHotelsList(){
  this.HotelService.getHotelsList().subscribe(data=>{
    this.HotelsList=data;
  });
}
}
