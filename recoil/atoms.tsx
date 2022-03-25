import { atom } from "recoil";

export const randomSentence = atom({
	key: "randomSentence", // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});
