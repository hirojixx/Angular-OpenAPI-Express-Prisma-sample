import { Component, OnInit } from '@angular/core';
import { ResponseUser, UsersService } from 'src/app/service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  users: ResponseUser[] = []

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.usersControllerGetUsers().subscribe(x => {
      this.users = x.data
    })
  }

}
