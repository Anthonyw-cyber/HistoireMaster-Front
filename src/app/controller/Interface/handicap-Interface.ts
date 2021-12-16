import {DispositifInterface} from "./dispositif-interface";

export interface Ihandicap{
  id : number;
  name: string;
  dispositif : Array<DispositifInterface>
  }
