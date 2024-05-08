import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from "./user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'simple-way-to-reload-data';

  constructor(
    public userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.userObs$.subscribe(console.log)

    this.userService.setId(2);
    this.userService.setId(3);
  }
}
