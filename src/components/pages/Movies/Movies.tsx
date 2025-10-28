import useMoviesQuery from "../../../hooks/useMoviesQuery";
import AcroolCarousel, { AcroolSlideImage } from "@acrool/react-carousel";
import type { MovieItem } from "../../../interfaces/movies";
import type { ReactNode } from "react";
import { Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from "./styles.module.css";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import MoviesSkeleton from "./MoviesSkeleton";

const Movies = () => {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseCartoons,
    responseSerial,
    responseFilms,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;

  if (hasError) return <ErrorMessage />;

  const dataForCarousel = (data: MovieItem[]): ReactNode[] => {
    return data.map((row: MovieItem) => (
      <AcroolSlideImage
        key={row.kinopoiskId}
        imageUrl={row.posterUrlPreview}
      ></AcroolSlideImage>
    ));
  };

  interface CarouselItem {
    title: string;
    url: string;
    data: ReactNode[];
  }

  const carouselArr: CarouselItem[] = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: dataForCarousel(responsePopular.data.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/best",
      data: dataForCarousel(responseBest.data.items),
    },
    {
      title: "Фильмы",
      url: "/movies",
      data: dataForCarousel(responseFilms.data.items),
    },
    {
      title: "Сериалы",
      url: "/serials",
      data: dataForCarousel(responseSerial.data.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: dataForCarousel(responseCartoons.data.items),
    },
  ];

  return (
    <>
      {carouselArr.map((item) => (
        <Stack className={styles.carousel} key={item.title}>
          <Link
            variant="h4"
            component={RouterLink}
            to={item.url}
            sx={{ mt: 2, mb: 2 }}
            textAlign={"center"}
          >
            {item.title}
          </Link>
          <AcroolCarousel
            data={item.data}
            isEnableNavButton
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableMouseMove
            isEnableLoop
            autoPlayTime={5000}
            breakpoints={{
              768: {
                slidesPerView: 5,
              },
            }}
            isEnableAutoPlay
          />
        </Stack>
      ))}
    </>
  );
};
export default Movies;
