import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelModel } from 'src/app/Models/hotel-model/hotel-model.model';
import { HotelServiceService } from 'src/app/Services/hotel-service/hotel-service.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {

  hotel = new HotelModel();
  hotelId!: number;
  wrongImageFormat: String = '';
  successMessage!: string;
  failMessage!: string;
  emptyData!: string;
  hotelImage: string = "";

  constructor(private hotelService: HotelServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.hotelId = parseInt(params.get('id')!)
    );
    this.loadData();
  }

  loadData() {
    this.hotelService.getHotel(this.hotelId)
      .subscribe(
        (data: HotelModel) => {
          this.hotel = data;
          this.hotelImage = "../../../assets/Hotels/" + this.hotel.photo;
          console.log("loadData", data)
        }
      );
  }

  editHotel(f: NgForm) {
    this.hotelService.updateHotel(this.hotelId, f.value)
      .subscribe(
        data => {
          this.successMessage = "Hotel actualizat cu succes!";
          console.log(this.successMessage)
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/admin-page/view-hotels']);
            console.log(data)
          },
            2000
          )
        },

        (err: any) => {
          this.failMessage = err.error.message;
          setTimeout(() => {
            this.failMessage = "Ceva nu este în regulă!";
          },
            4000)
        }
      )
  }

  uploadImage(event: any) {
    this.wrongImageFormat = "";
    var photo = event.target.files[0]
    const checkExtension = (/\.(gif|jpeg|jpg|png)$/i);
    if (!checkExtension.test(photo.name)) {
      this.wrongImageFormat = "Wrong image format. Please try again!"
    }
    else{
      this.hotelImage = "../../../assets/Hotels/" + photo.name;
      const formData:FormData=new FormData();
      formData.append('uploadedFile', photo, photo.name);
      this.hotel.photo = photo.name;
    }
  }

}
