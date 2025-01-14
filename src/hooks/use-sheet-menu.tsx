import { useState } from "react";

export const useSheetMenu = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return [isOpen, setIsOpen];
};
