import {Component, OnInit} from '@angular/core';
import {CommonService} from './service/common.service';
import {UserModel} from './model/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  keyCount: number;
  upCount: number;
  downCount: number;
  userDetailsList: UserModel[] = [];
  searchInput = {
    key: ''
  };
  data = [];

  constructor(private service: CommonService) {
    this.keyCount = this.upCount = this.downCount = 0;
  }

  ngOnInit(): void {

    this.service.fetchUsers().subscribe(response => {
      if (response) {
        this.userDetailsList = response;
      }
    }, error => {
      alert(error.message);
    });
  }

  /**
   *  search for the details in the user details array
   */
  searchForUserDetails(e): void {
    this.data = this.userDetailsList.filter(element => {
      return (
        element.items.some(item => item.toLowerCase().search(this.searchInput.key.toLowerCase()) !== -1) ||
        element.name.toLowerCase().search(this.searchInput.key.toLowerCase()) !== -1 ||
        element.id.toLowerCase().search(this.searchInput.key.toLowerCase()) !== -1 ||
        element.address.toLowerCase().search(this.searchInput.key.toLowerCase()) !== -1 ||
        element.pincode.toLowerCase().search(this.searchInput.key.toLowerCase()) !== -1
      )
        ? element : '';
    });
    // check for fired event key
    if (e.key === 'ArrowUp') {
      this.upCount = this.keyCount - 1;
      if (this.data.length - 1 >= this.upCount && this.upCount >= 0) {
        this.keyCount = this.upCount;
      }
    } else if (e.key === 'ArrowDown') {
      this.downCount = this.keyCount + 1;
      if (this.data.length - 1 >= this.downCount) {
        this.keyCount = this.downCount;
      }
    }
  }

  /**
   * on mouse hover we pass the index value to highlight that particular user
   * @param indexValue
   */
  onMouseHover(indexValue): void {
    this.keyCount = indexValue;
  }

}
