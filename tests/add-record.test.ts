import { AddRecord } from "../records/add.record";

test("Can build AddRecord", () => {
  const add = new AddRecord({
    name: "TestName",
    description: "bal",
    url: "fwfhiuoew",
    price: 10,
    lat: 9,
    lon: 9,
  });
  expect(add.name).toBe("TestName");
});

