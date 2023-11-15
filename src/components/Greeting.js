import React, { useState } from "react";
import Output from "./Output";

const Greeting = () => {
	const [changedText, setChangedText] = useState(false);

	const changeTextHandler = () => { setChangedText(true) };

	return (
		<div>
			<h2>Hello World!</h2>
			<Output>{changedText ? "Changed!" : "Good to see you!"}</Output>
			<button onClick={changeTextHandler}>Change Text!</button>
		</div>
	);
};

export default Greeting;
