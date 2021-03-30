import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
   selector: 'app-tlights',
   templateUrl: './tlights.component.html',
   styleUrls: ['./tlights.component.css']
})
export class TlightsComponent implements OnInit {

   private readonly RED_COLOR = '#FF6465';
   private readonly YELLOW_COLOR = '#FFD782';
   private readonly GREEN_COLOR = '#A5EB78';
   private readonly OFF_COLOR = '#A5A5A5';

   constructor() { }

   private _color1 = this.RED_COLOR;
   private _color2 = this.OFF_COLOR;
   private _color3 = this.OFF_COLOR;

   private timer: any = null;
   private blink: boolean = false;
   private state: number = 0;

   get color1(): string { return this._color1; }
   get color2(): string { return this._color2; }
   get color3(): string { return this._color3; }

   ngOnInit(): void {
   }

   setRed(): void {
      this.setState(1);
   }

   setGreen(): void {
      this.setState(3);
   }

   setYellow(): void {
      this.setState(2);
   }

   setOff(): void {
      this.setState(0);
   }

   setState(new_state: number): void {
      if (this.state == new_state) return;

      if (this.state == 2)
         clearInterval(this.timer);

      this.state = new_state;
      this._color1 = this.state == 1 ? this.RED_COLOR : this.OFF_COLOR;
      this._color2 = this.state == 2 ? this.YELLOW_COLOR : this.OFF_COLOR;
      this._color3 = this.state == 3 ? this.GREEN_COLOR : this.OFF_COLOR;

      if (this.state == 2) {
         this.blink = false;
         this.timer = setInterval(() => {
            if (this.blink) this._color2 = this.YELLOW_COLOR;
            else this._color2 = this.OFF_COLOR;
            this.blink = !this.blink;
         }, 1000)
      }
   }

}
