import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
	// creates a test suite
	test('renders "Hello World" text', () => {
		// arrange
		render(<Greeting />);
		// Act - NOP nere

		// Assert
		//screen.getByText('Hello World!', {exact: false}); // exact: true is default, incl. case-sensitivity
		const helloWorldElement = screen.getByText("Hello World!");
		// without the `!` at the end, the test would fail (exact match, by default)
		expect(helloWorldElement).toBeInTheDocument();
	});

	test('renders "Good to see you!" text BEFORE the button was clicked', () => {
		// arrange
		render(<Greeting />);
		// Act - NOP nere

		// Assert
		const testText = screen.getByText("good to see you", { exact: false });
		expect(testText).toBeInTheDocument();
	});

	test('renders "Changed!" AFTER the button was clicked', () => {
		// arrange
		render(<Greeting />);
		// Act
		const buttonElement = screen.getByRole("button");
		userEvent.click(buttonElement);
		//Assert
		const outputElement = screen.getByText("Changed!");
		expect(outputElement).toBeInTheDocument();
	});

  	test('does NOT render "good to see you" AFTER the button was clicked', () => {
			// arrange
			render(<Greeting />);
			// Act
			const buttonElement = screen.getByRole("button");
			userEvent.click(buttonElement);
			//Assert
			// in cases where we test for a NEGATIVE RESULT (text NOT rendered)
			// getByText will throw an error, and the test will always fail;
			// In these cases, we have to use queryByText() and test for: not.toBeInTheDocument().
			const outputElement = screen.queryByText("good to see you", {
				exact: false,
			});
			expect(outputElement).not.toBeInTheDocument();
		});
});
