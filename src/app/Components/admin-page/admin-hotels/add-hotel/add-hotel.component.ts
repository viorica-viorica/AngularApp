import { Router } from '@angular/router';
import { HotelModel } from './../../../../Models/hotel-model/hotel-model.model';
import { HotelServiceService } from './../../../../Services/hotel-service/hotel-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  constructor(private hotelService: HotelServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  hotel: HotelModel | undefined;
  hotelId!: number;
  name!: string;
  address!: string;
  price!: number;
  rooms!: number;
  adults!: number;
  children!: number;
  latitude!: number;
  longitude!: number;
  photo!: File;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;

  HotelsList: HotelModel[] = [];

  hotelSaveForm = new FormGroup({
    hotelName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    hotelAddress: new FormControl('', [Validators.required, Validators.minLength(5)]),
    hotelPrice: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelRooms: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelAdults: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelChildren: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelLatitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelLongitude: new FormControl('', [Validators.required, Validators.minLength(1)]),
    hotelPhoto: new FormControl('')
  });

  checkHotel() {
    if (!this.name || !this.address || !this.price || !this.rooms || !this.adults || !this.children || !this.latitude
      || !this.longitude) {
      this.emptyData = "Toate câmpurile sunt obloigatorii!"
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
    this.photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(this.photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
  }

  createHotel() {
    this.hotel = {
      hotelId: null!,
      name: this.name,
      address: this.address,
      price: this.price,
      rooms: this.rooms,
      adults: this.adults,
      children: this.children,
      latitude: this.latitude,
      longitude: this.longitude,
      photo: this.photo
    };
    if (this.wrongImageFormat === '') {
      this.hotelService.addHotel(this.hotel)
        .subscribe(
          (callback: any) => {
            if (callback) {
              this.successMessage = "Hotel adăugat cu succes!";
              console.log(this.successMessage)
              setTimeout(() => {
                this.successMessage = '';
                this.router.navigate(['/admin-page/view-hotels']);
                console.log(callback)
              },
                2000)
            }
            else {
              this.failMessage = "Ceva nu e bine. Încercă din nou!";
              setTimeout(() => {
                this.failMessage = '';
              },
                2000)
            }
          },

          (err: any) => {
            this.failMessage = err.error.message;
            setTimeout(() => {
              this.failMessage = "Ceva nu este în regulă!";
            },
              4000)
          })
      this.hotelSaveForm.reset();
    }
  }

}
