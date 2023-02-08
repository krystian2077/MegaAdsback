import { AdEntity, NewAdEntity, SimpleAddEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

type AddRecordResults = [AdEntity[], FieldPacket[]];

export class AddRecord implements AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków"
      );
    }

    if (obj.description.length > 1000) {
      throw new ValidationError(
        "Treść ogłoszenia nie może przekraczać 1000 znaków"
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Cena nie może być mniejsza niż 0 lub większa niż 9 999 999"
      );
    }

    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        "Adres ogłoszenia nie może być pusty, ani przekraczać 100 znaków"
      );
    }

    // if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
    //   throw new ValidationError("Nie można zlokalizować ogłoszenia.");
    // }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string): Promise<AddRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE id = :id",
      {
        id,
      }
    )) as AddRecordResults;

    return results.length === 0 ? null : new AddRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAddEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AddRecordResults;
    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }
}
