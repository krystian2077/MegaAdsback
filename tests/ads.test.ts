import { AddRecord } from "../records/add.record";
import { pool } from "../utils/db";
import { AdEntity } from "../types";

afterAll(async () => {
  await pool.end();
});

test("AdRecord returns data from database", async () => {
  const ad = await AddRecord.getOne("abc");

  expect(ad).toBeDefined();
  expect(ad.id).toBe("abc");
  expect(ad.description).toBe("testowaaaa");
});

test("AdRecord returns null from databse for unexciting entry", async () => {
  const ad = await AddRecord.getOne("----");

  expect(ad).toBeNull();
});
test("AdRecord returns array of found entries", async () => {
  const ads = await AddRecord.findAll("");

  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined();
});

test("AdRecord returns empty array when searching for sth that does not exist", async () => {
  const ads = await AddRecord.findAll("-----------------");

  expect(ads).toEqual([]);
});

test("AdRecord returns small data", async () => {
  const ads = await AddRecord.findAll("");

  expect((ads[0] as AdEntity).price).toBeUndefined();
  expect((ads[0] as AdEntity).description).toBeUndefined();
});
