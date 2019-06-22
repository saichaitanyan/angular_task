import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../model/UserModel';

const userApi = 'http://www.mocky.io/v2/5ba8efb23100007200c2750c';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

  /**
   * fetch the user details from server
   */

  fetchUsers(): Observable<any> {
    return this.http.get(userApi);
  }

}
