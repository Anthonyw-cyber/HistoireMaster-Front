
import {Ihandicap} from "./handicap-Interface";


export interface MuseeInterface{
  id : number;
  name : string;
  adresse:string;
  description: string;
  siteweb: string;
  typologie :string;
  handicap : Array<Ihandicap>[];

}
