import { Stack, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MOVIE_LISTS } from "../../../constants";
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from "../../../services/api";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import MoviesList from "../../UI/MoviesList/MoviesList";
import MoviesListSkeleton from "../../UI/MoviesListSkeleton/MoviesListSkeleton";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import SelectMovies from "../../UI/SelectMovies/SelectMovies";
import { ArrowBack } from "@mui/icons-material";

const MoviesListMain = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const movieType: any = MOVIE_LISTS.find((el) => el.url === location.pathname);
  const { countries, order, genreId } = useSelector(
    (state: RootState) => state.movie
  );
  const { data, error, isLoading } = useGetFilmsQuery({
    type: movieType.value,
    countries,
    order,
    genreId,
    page,
  });
  const navigate = useNavigate();

  const { 
    data: genresAndCountriesData, 
    error: genresAndCountriesError, 
    isLoading: isGenresAndCountriesLoading 
  } = useGetGenresAndCountriesQuery(undefined);

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (error || genresAndCountriesError) return <ErrorMessage />;
  if (isLoading || isGenresAndCountriesLoading)
    return <MoviesListSkeleton />;

  if (!data || !genresAndCountriesData) {
    return <ErrorMessage />;
  }

  console.log(data, error, isLoading);
  return (
    <>
      <SelectMovies
        countriesList={genresAndCountriesData.countries || []}
        genresList={genresAndCountriesData.genres || []}
        countries={countries}
        order={order}
        genreId={genreId}
        page={page}
      />
      <Stack flexDirection={"row"}>
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
          Назад
        </Button>
        <Typography>{movieType.title}</Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
export default MoviesListMain;
