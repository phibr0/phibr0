declare global {
	interface Document {
		startViewTransition: (func: () => void) => void;
	}
}

export const transition = (func: () => void) => {
	if ("startViewTransition" in document) {
		document.startViewTransition(() => func());
	} else {
		func();
	}
};
