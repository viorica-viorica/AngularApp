import { HotelModel } from './../../../Models/hotel-model/hotel-model.model';
import { HotelServiceService } from './../../../Services/hotel-service/hotel-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-hotels',
  templateUrl: './admin-hotels.component.html',
  styleUrls: ['./admin-hotels.component.css']
})
export class AdminHotelsComponent implements OnInit {

  constructor(private service:HotelServiceService) { }

  @Input() hotel: HotelModel | undefined;
  HotelId!: number;
  Name!: string;
  Adress!: string;
  Price!: number;
  Rooms!: number;
  Adults!: number;
  Children!: number;
  Latitude!: number;
  Longitude!: number;
  Photo!: File;
  name!: String;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;

  HotelsList: HotelModel[] = [];

  hotelSaveForm = new FormGroup({
    hotelName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    hotelAdress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    hotelPrice: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelRooms: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelAdults: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelChildren: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelLatitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelLongitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelPhoto: new FormControl('')
  });

  ngOnInit(): void {
    this.refreshHotelsList();
  }

  checkData() {
    if (!this.Name || !this.Adress || !this.Price || !this.Rooms || !this.Adults || !this.Children || !this.Latitude 
      || !this.Longitude || !this.Photo) {
      this.emptyData = "Please provide data in all fields!"
      setTimeout(() => {
        this.emptyData = '';
      },
        2000)
    }
    else {
      this.createHotel();
    }
  }

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    this.Photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(this.Photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
  }

  createHotel(){
    this.hotel = {
      HotelId: null!,
      Name: this.Name,
      Adress: this.Adress,
      Price: this.Price,
      Rooms: this.Rooms,
      Adults: this.Adults,
      Children: this.Children,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      Photo: this.Photo
    };
                
      if (this.wrongImageFormat === '') {
        this.service.addHotel(this.hotel)
          .subscribe(
            (callback: any) => {
            if (callback) {
              this.successMessage = callback.message;
                console.log(this.successMessage)
                  setTimeout(() => {
                    this.successMessage = '';
                    //this.router.navigate(['/ ..]) - main page
                    console.log(callback)
                  },
                  2000)
                }
                else {
                  this.failMessage = "Something went wrong. Please try again!";
                    setTimeout(() => {
                      this.failMessage = '';
                    },
                  2000)
                }
              },
            
        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Something went wrong.";
          },
          4000)
        })
        this.hotelSaveForm.reset();
        this.refreshHotelsList();
      }
    // this.service.addHotel(this.hotel).subscribe(res=>{
    //   alert(res.toString());
    // });
  }

  updateEditHotel(){
    this.hotel = {
      HotelId: null!,
      Name: this.Name,
      Adress: this.Adress,
      Price: this.Price,
      Rooms: this.Rooms,
      Adults: this.Adults,
      Children: this.Children,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      Photo: this.Photo
    };
                
      if (this.wrongImageFormat === '') {
        this.service.updateHotel(this.hotel)
          .subscribe(
            (callback: any) => {
            if (callback) {
              this.successMessage = callback.message;
                console.log(this.successMessage)
                  setTimeout(() => {
                    this.successMessage = '';
                    //this.router.navigate(['/ ..]) - main page
                    console.log(callback)
                  },
                  2000)
                }
                else {
                  this.failMessage = "Something went wrong. Please try again!";
                    setTimeout(() => {
                      this.failMessage = '';
                    },
                  2000)
                }
              },
            
        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = '';
          },
          4000)
        })
        this.hotelSaveForm.reset();
        this.refreshHotelsList();
      }
    }

    deleteItem(item: HotelModel){
      // this.HotelsList.splice(this.HotelsList.indexOf(item), 1);
      if(confirm('Are you sure?')){
        this.service.deleteHotel(item.HotelId).subscribe(data => {
          alert(data.toString());
          this.refreshHotelsList();
        });
      }
    }

  
  refreshHotelsList(){
    this.service.getHotelsList().subscribe(data=>{
      this.HotelsList=data;
    });
  }
}
