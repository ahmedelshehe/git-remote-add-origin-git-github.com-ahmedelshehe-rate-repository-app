import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "../../components/SignIn";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    // eslint-disable-next-line jest/expect-expect
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "ahmed");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "12345678");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "ahmed",
          password: "12345678",
        });
      });
    });
  });
});
