import { createContext } from "react";
import { IGenre } from "../../movieAPI/MovieAPI";

type IContext = null | IGenre[];

export const { Provider: GenreProvaider, Consumer: GenreConsumer } =
  createContext<null | IContext>(null);
