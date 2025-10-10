import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
}));

test("renders without crashing", () => {
  render(<App />);
  expect(screen.getByText(/login/i) || screen.getByText(/register/i)).toBeTruthy();
});
