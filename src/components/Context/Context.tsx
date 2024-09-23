import { createContext } from "react";
import { IGenre } from "../../movieAPI/MovieAPI";

type IContext = null | {
  genreList: IGenre[] | null;
  setScore: (score: number, id: number, guestSessionId: string) => void;
  guestSession: string;
};

export const { Provider: GenreProvaider, Consumer: GenreConsumer } =
  createContext<null | IContext>(null);
