import { Component, ViewChild, OnInit } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   @ViewChild('tlights') tlights;
   @ViewChild('code_input') code_input;

   public blocked: boolean = true;
   public show_access: boolean = true;

   private timer: any;
   private connect_timer: any;
   private client: Paho.MQTT.Client;
   private use_ssl: boolean = false;
   private do_connect: boolean = true;
   private connected: boolean = false;

   private readonly SET_SEMAPHORE_TAG = '/test/jp';
   private readonly GET_SEMAPHORE_TAG = '/test/jp';


   private mqttConnect(): void {
      if (this.do_connect) {
         this.client.connect({
            useSSL: this.use_ssl,
            onSuccess: this.onConnected.bind(this),
            onFailure: this.onFailure.bind(this)
         });
      }
   }

   ngOnInit(): void {
      console.log('SSL use: ' + (this.use_ssl ? "yes" : "no"));

      let url = 'ws://test.mosquitto.org:8080/mqtt';
      if (this.use_ssl) url = 'wss://test.mosquitto.org:8081/mqtt';

      console.log('MQTT URL: ' + url);

      let cid = 's3mpahore_' + Math.trunc(1e6 + (Math.random() * 1e6));
      console.log('Client ID: ' + cid);

      this.client = new Paho.MQTT.Client(url, cid);

      this.client.onMessageArrived = (message: Paho.MQTT.Message) => {
         console.log('Message arrived: "' + message.payloadString + '"');

         let code = parseInt(message.payloadString);
         code = Math.max(0, Math.min(3, code));
         this.blocked = (code == 1);
         this.tlights.setState(code);
      };

      this.client.onConnectionLost = (response: any) => {
         this.connected = false;
         console.log('Connection lost!');

         this.connect_timer = setInterval(() => {
            this.mqttConnect();
            clearInterval(this.connect_timer);
         }, 2000)
      };

      this.mqttConnect();
   }

   private onConnected(): void {
      this.connected = true;
      console.log('Connected to broker' + (this.use_ssl ? " (SSL)." : "."));

      this.client.subscribe(this.GET_SEMAPHORE_TAG, {});
   }

   private onFailure(): void {
      console.log("Connection failure!");
   }

   onClickButton(): void {
      /*if(this.connected) {
         this.client.send();
      }*/ 

      /*this.blocked = !this.blocked;
      this.tlights.setState(this.blocked ? 1 : 3);
      clearInterval(this.timer);
      if (!this.blocked) {
         this.timer = setInterval(() => {
            this.tlights.setRed();
            clearInterval(this.timer);
            this.blocked = true;
         }, 4000)
      }*/
   }

   onCodeCompleted(code: string): void {
      //this.blocked = !this.blocked;
      if (code == "11979")
         this.show_access = false;
      else
         this.code_input.reset();
   }
}
