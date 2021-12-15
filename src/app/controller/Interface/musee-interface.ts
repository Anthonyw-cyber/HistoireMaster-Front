interface MuseeInterface{
  id : number;
  museeName : string;
  adresse:string;
  description: string;
  siteweb: string;
  dispositif : Array<DispositifInterface>[];

}
