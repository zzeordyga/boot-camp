import { validate } from "../utils/validate";

test("Check empty input", ()=>{
    expect(validate("")).toBe(false);
});

test("Check input", ()=>{
    expect(validate("task 1")).toBe(true);
});