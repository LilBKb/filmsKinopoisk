import { useSelector } from "react-redux";
import { TOP_LISTS } from "../constants";
import type { RootState } from "../store/store";
import { useGetFilmsQuery, useGetFilmsTopQuery } from "../services/api";

export default function useMoviesQuery() {
  const { countries, order, page } = useSelector(
    (state: RootState) => state.movie
  );

  const responsePopular = useGetFilmsTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetFilmsTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    page,
    countries,
    genreId: "1",
    order,
    type: "FILM",
  });

  const responseSerial = useGetFilmsQuery({
    page,
    countries,
    genreId: "1",
    order,
    type: "TV_SERIES",
  });

  const responseCartoons = useGetFilmsQuery({
    page,
    countries,
    genreId: "18",
    order,
    type: "FILM",
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseFilms.isFetching ||
    responseSerial.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseFilms.error ||
    responseSerial.error ||
    responseCartoons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseCartoons,
    responseSerial,
    responseFilms,
  };
}
