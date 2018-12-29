import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FaceRecognitionService } from '../../face-recognition.service';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css']
})
export class CamComponent implements OnInit {
  dataUri;
  faceData:any=[];
  img64;
  singlePerson= true;
  personNumber;
  firtPerson;
  public leftRec ;
  public topRec ;
  public  widthRec;
  public heightRec;
  public isLoading=false;
  context: CanvasRenderingContext2D;
    @ViewChild("video")
    public video: ElementRef;

    @ViewChild("canvas")
    public canvas: ElementRef;

    public captures: Array<any>;



  public constructor(public cam : FaceRecognitionService  ) {
    this.captures = [];
  }

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');


  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
        });
    }
}

public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 512, 384);
    this.dataUri = this.canvas.nativeElement.toDataURL("image/png");
    //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
}




public getData(){
  this.isLoading= true,
  this.cam.scanImage(this.dataUri).subscribe(
    data=>{this.faceData = data.json();
      this.isLoading=false;
      console.log(this.faceData);
      console.log(this.faceData.length);
      if (this.faceData.length===1){
        this.singlePerson=true;
        console.log(this.singlePerson);
      }

      else  {
        this.singlePerson=false;
        console.log(this.singlePerson)
      }
      this.personNumber= this.faceData.length;
      console.log(this.personNumber);
      for (let i = 0; i < this.faceData.length; i++) {
        this.leftRec = this.faceData[i].faceRectangle.left ;
        this.topRec = this.faceData[i].faceRectangle.top;
        this.widthRec = this.faceData[i].faceRectangle.width;
        this.heightRec = this.faceData[i].faceRectangle.height;
        this.context.strokeStyle = '#1DF2DC';
        this.context.strokeRect(this.leftRec, this.topRec, this.widthRec, this.heightRec);
        this.context.font = '20px Arial';
        this.context.fillStyle = '#1DF2DC';
        this.context.fillText('Person' + (i + 1), this.leftRec + 10, this.topRec - 10);

      }
})
}

}



