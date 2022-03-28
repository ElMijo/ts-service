import express from "express"
import routers from "../../src/routers"
import "../../src/app"

jest.mock("express")
jest.mock("../../src/routers")
jest.mock("../../src/middleware", () => ["middleware-one", "middleware-two"])

const expressMock = express as jest.MockedFunction<typeof express>

it("Should create an express application", () => {
  const app = expressMock.mock.results[0].value
  expect(app.disable).toBeCalledWith("x-powered-by")
  expect(app.use).toBeCalledWith("middleware-one")
  expect(app.use).toBeCalledWith("middleware-two")
  expect(app.use).toBeCalledWith(routers)
})
