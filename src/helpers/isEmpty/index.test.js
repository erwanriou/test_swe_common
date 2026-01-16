const { isEmpty } = require("./")

// DATAS
class Data {
  constructor() {
    return {
      string1: "",
      string2: "hello world2",
      string3: false,
      string4: true,
      object1: {
        string1: "hello world",
        string2: "hello world2",
        string3: false,
        string4: true,
        emptyArray1: [undefined, null],
        emptyString1: null,
        emptyObject1: {}
      },
      object2: {
        string1: "hello world",
        array1: ["hello world", "hello world2", "hello world3"],
        emptyArray1: [],
        emptyString1: "",
        emptyObject1: {}
      },
      array1: ["hello world", "hello world2", "hello world3", "", null],
      array2: [
        { string1: "hello world", string2: "hello world2" },
        { string1: "hello world", string2: "hello world2" },
        { string1: "hello world", emptyString2: "" },
        { emptyString1: "", emptyString2: null }
      ],
      emptyString1: "",
      emptyObject1: {},
      emptyArray1: []
    }
  }
}

// TEST SERIES
test("1. it should check that empty fields are empty for a string", () => {
  // GENERATE DATA
  const data = new Data()
  // LAUNCH FUNCTION
  const isFalse = isEmpty(data.string2)
  const isTrue = isEmpty(data.emptyString1)
  // TEST BEHAVIOR
  expect(isFalse).toBeFalsy()
  expect(isTrue).toBeTruthy()
})

test("2. it should check that empty fields are empty for an object", () => {
  // GENERATE DATA
  const data = new Data()
  // LAUNCH FUNCTION
  const isFalse = isEmpty(data.object1)
  const isTrue = isEmpty(data.emptyObject1)
  // TEST BEHAVIOR
  expect(isFalse).toBeFalsy()
  expect(isTrue).toBeTruthy()
})

test("3. it should check that empty fields are empty for an array", () => {
  // GENERATE DATA
  const data = new Data()
  // LAUNCH FUNCTION
  const isFalse = isEmpty(data.array2)
  const isTrue = isEmpty(data.emptyArray1)
  // TEST BEHAVIOR
  expect(isFalse).toBeFalsy()
  expect(isTrue).toBeTruthy()
})

test("4. it should check that empty fields are empty for undefined", () => {
  // GENERATE DATA
  const data = new Data()
  // LAUNCH FUNCTION
  const isFalse = isEmpty(data.string3)
  const isTrue = isEmpty(data.object1.emptyArray1[0])
  // TEST BEHAVIOR
  expect(isFalse).toBeFalsy()
  expect(isTrue).toBeTruthy()
})

test("5. it should check that empty fields are empty for null", () => {
  // GENERATE DATA
  const data = new Data()
  // LAUNCH FUNCTION
  const isFalse = isEmpty(data.string3)
  const isTrue = isEmpty(data.object1.emptyString1)
  // TEST BEHAVIOR
  expect(isFalse).toBeFalsy()
  expect(isTrue).toBeTruthy()
})
