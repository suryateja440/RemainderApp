import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
 
  @Input() public src: string ;
  @Input() public autoplay: boolean = false;
  @Input() public showStateLabel: boolean = false;
  public audioStateLabel = 'Audio sample';
  @Input() public volume: number = 1.0; /* 1.0 is loudest */

  @ViewChild('audioElement', { static: false }) public _audioRef:  ElementRef;
  private audio: HTMLMediaElement;

  // public ngAfterViewInit() {

  // }
  ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.askForApproval();
      this.audio.volume = this.volume;
      this.audio.autoplay = this.autoplay;
    }
  }
  title = 'Rmainder';


  constructor()
  {


  }

 
			
   askForApproval() {
      if(Notification.permission === "granted") {
          this.createNotification('Wow! This is great', 'created by @study.tonight', '../assets/Images/icon.png');
      }
      else {
          Notification.requestPermission(permission => {
              if(permission === 'granted') {
                  this.createNotification('Wow! This is great', 'created by @study.tonight', '../assets/Images/icon.png');
      }
  });
  }
  }
  
   createNotification(title :any, text:any, icon:any) {
      this.playSound('../assets/sounds/water/mixkit-drinking-water-from-water-bottle-144.wav');
      const noti = new Notification(title, {
          body: text,
          icon
          });
  }

    playSound(url:string) {
      
      // this.audio.nativeElement.muted =false;
     

      this.audio.play();
      
    }

}
