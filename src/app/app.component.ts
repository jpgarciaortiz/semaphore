import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('tlights') tlights;
  @ViewChild('code_input') code_input;

  private timer: any;
  public blocked: boolean = true;
  public show_access: boolean = true;

  onClickButton(): void {
    this.blocked = !this.blocked;
    this.tlights.setState(this.blocked ? 1 : 3);
    clearInterval(this.timer);
    if (!this.blocked) {
       this.timer = setInterval(() => {
          this.tlights.setRed();
          clearInterval(this.timer);
          this.blocked = true;
       }, 4000)
    }
 }

 onCodeCompleted(code: string): void {
    //this.blocked = !this.blocked;
    if(code == "1979")
       this.show_access = false;
    else
       this.code_input.reset();
 } 
}
