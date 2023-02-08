export interface NewAdEntity extends Omit<AdEntity, "id"> {
  id?: string;
}

export interface SimpleAddEntity {
  id: string;
  lat: number;
  lot: number;
}

export interface AdEntity extends SimpleAddEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}
