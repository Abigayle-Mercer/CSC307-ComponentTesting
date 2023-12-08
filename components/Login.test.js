import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "./Login";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("Login component", () => {
  it("renders Login form correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    // Check if the Login form components are rendered
    expect(getByText ("Login")).toBeDefined();
    expect(getByPlaceholderText("Email")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByText("Login")).toBeDefined();
    expect(getByText("Dont have an account? Sign Up")).toBeDefined();
  });

  it("renders Sign Up form correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    // Switch to Sign Up form
    fireEvent.press(getByText("Dont have an account? Sign Up"));

    // Check if the Sign Up form components are rendered
    expect(getByText("Sign Up")).toBeDefined();
    expect(getByPlaceholderText("name")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByPlaceholderText("email")).toBeDefined();
    expect(getByPlaceholderText("phone")).toBeDefined();
    expect(getByText("Sign up")).toBeDefined();
    expect(getByText("Already have an account? Login")).toBeDefined();
  });





  it("toggles between Login and Sign Up forms correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    // Switch to Sign Up form
    fireEvent.press(getByText("Dont have an account? Sign Up"));

    // Check if the components of Sign Up form are rendered
    expect(getByText("Sign Up")).toBeDefined();

    // Switch back to Login form
    fireEvent.press(getByText("Already have an account? Login"));

    // Check if the components of Login form are rendered
    expect(getByText("User Login")).toBeDefined();
  });

 

  it("displays error message on invalid Sign Up submission", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Login />);

    // Switch to Sign Up form
    fireEvent.press(getByText("Dont have an account? Sign Up"));

    // Simulate user input (invalid name, email, and password)
    fireEvent.changeText(getByPlaceholderText("name"), "");
    fireEvent.changeText(getByPlaceholderText("Password"), "weak");
    fireEvent.changeText(getByPlaceholderText("email"), "invalid-email");

    // Simulate form submission
    fireEvent.press(getByText("Sign up"));

    // Check if the error message is displayed
    expect(
      queryByText("Invalid input. Please check your entries.")
    ).toBeDefined();
  });

 

  

  test("handles login with missing fields", async () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("Login"));
    await waitFor(() => getByText("Please enter all fields!"));
  });

  

  test("handles sign-up with missing fields", async () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("Dont have an account? Sign Up"));
    fireEvent.press(getByText("Sign up"));
    await waitFor(() => getByText("Please enter all fields!"));
  });

    test("handles login with valid input", () => {
      const navigationMock = { navigate: jest.fn() };
      const { getByPlaceholderText, getByText } = render(
        <Login navigation={navigationMock} />
      );

      fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
      fireEvent.changeText(getByPlaceholderText("Password"), "testpassword");
      fireEvent.press(getByText("Login"));

      expect(navigationMock.navigate).toHaveBeenCalledWith("Profile", {
        name: "noah",
      });
    });

    test("displays error message on login with empty fields", () => {
      const { getByText } = render(<Login />);
      fireEvent.press(getByText("Login"));

      expect(getByText("Please enter all fields!")).toBeTruthy();
    });

    test("toggles to sign-up form", () => {
      const { getByText } = render(<Login />);
      fireEvent.press(getByText("Dont have an account? Sign Up"));

      expect(getByText("Sign Up")).toBeTruthy();
    });
});
