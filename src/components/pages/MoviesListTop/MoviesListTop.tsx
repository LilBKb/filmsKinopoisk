import { useLocation, useNavigate } from "react-router-dom";
import { TOP_LISTS } from "../../../constants";
import {
  useGetFilmsTopQuery,
  useGetGenresAndCountriesQuery,
} from "../../../services/api";
import { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../UI/MoviesList/MoviesList";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import MoviesListSkeleton from "../../UI/MoviesListSkeleton/MoviesListSkeleton";
import SelectMovies from "../../UI/SelectMovies/SelectMovies";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { ArrowBack } from "@mui/icons-material";

const MoviesListTop = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const movieType: any = TOP_LISTS.find((el) => el.url === location.pathname);
  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });
  const navigate = useNavigate();

  const { countries, order, genreId } = useSelector(
    (state: RootState) => state.movie
  );
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
      <Stack flexDirection={"row"} marginTop={"80px"}>
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
export default MoviesListTop;
