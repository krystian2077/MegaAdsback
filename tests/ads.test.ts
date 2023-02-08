import { AddRecord } from "../records/add.record";

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
