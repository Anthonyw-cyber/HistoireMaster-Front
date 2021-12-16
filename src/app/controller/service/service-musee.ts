import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class museeService {
  url = environment.apiUrl;


  constructor(public httpClient: HttpClient,) {

  }



  findMusee(): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/musee`);
  }
}
