import { SyntheticEvent } from "react";
import noposter from "../assets/noposter.jpg";

export const handleImageError = (event: SyntheticEvent) => {
  (event.target as HTMLImageElement).src = `${noposter}`;
};
