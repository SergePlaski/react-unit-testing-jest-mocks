import { render, screen } from "@testing-library/react";

import AsyncFetch from "./AsyncFetch";

describe('Async component', (() => {
	// The component fetches data asynchronously,
	// so we CANNOT look for rendered <li> elements immediately;
	// We need to await for the result of the fetch() call.
	// We can specify for how long we wait in the timeout argument;
	// Note that all find* methods return a promise that need to be awaited to be resolved.
	// SUMMARY: use async callback function in test() to instruct Jest to run the test asynchronously 
  // AND wait the result of screen.findAllByRole()
	test("renders posts if request succeeds", async () => {
    // Arrange:
    // mock the fetch() request
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }], // emulates .json() method, expected to return an array of data
    });

		render(<AsyncFetch />);

		// const listItemElements = await screen.findAllByRole('listitem', { exact: true}, { timeout: 1 });
		const listItemElements = await screen.findAllByRole("listitem"); // default timeout is 1 sec
		expect(listItemElements).not.toHaveLength(0); // some list item elements are rendered
	});
}))

// The complete list of roles (ARIA):
// https://www.w3.org/TR/html-aria/#docconformance