import { Rating, Stack, Tooltip, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styles from "./styles.module.css";

const MovieCard = ({ movie, reload = false }: any) => {
  const linkProps = reload
    ? { component: "a", href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  return (
    <Stack key={movie.kinopoiskId} alignItems={"center"}>
      <Link {...linkProps}>
        <img src={movie.posterUrl} alt={movie.nameRu} className={styles.img} />
        <Link component="p" textAlign="center" sx={{ width: "200px" }}>
          {movie.nameRu ? movie.nameRu : movie.nameEn}
        </Link>
      </Link>
      {movie.ratingKinopoisk && (
        <Stack alignItems={"center"}>
          <Tooltip title={`${movie.ratingKinopoisk}/10`}>
            <Rating
              name="read-only"
              value={movie.ratingKinopoisk / 2}
              readOnly
              precision={0.1}
            />
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default MovieCard;
