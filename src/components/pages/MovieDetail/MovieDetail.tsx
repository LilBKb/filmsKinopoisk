import { useNavigate, useParams } from "react-router-dom";
import {
  useGetStaffQuery,
  useGetSequelsandPrequelsQuery,
  useGetFilmQuery,
} from "../../../services/api";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { ArrowBack } from "@mui/icons-material";
import MovieCard from "../../UI/MovieCard/MovieCard";
import VideoPlayer from "../../UI/VideoPlayer/VideoPlayer";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const film = useGetFilmQuery(id!, { skip: !id });
  const staff = useGetStaffQuery(id!, { skip: !id });
  const sequelsAndPrequels = useGetSequelsandPrequelsQuery(id!, { skip: !id });

  if (!id) {
    return <ErrorMessage />;
  }

  if (film.isLoading || staff.isLoading || sequelsAndPrequels.isLoading) {
    return (
      <Box 
        display={"flex"} 
        flexDirection="column"
        justifyContent={"center"} 
        alignItems="center"
        margin={"auto"}
        minHeight="50vh"
        gap={2}
      >
        <CircularProgress size={"4rem"} />
        <Typography variant="h6" color="text.secondary">
          Загрузка информации о фильме...
        </Typography>
      </Box>
    );
  }

  if (film.error || staff.error || sequelsAndPrequels.error) {
    console.error('API Error:', { 
      film: film.error, 
      staff: staff.error, 
      sequels: sequelsAndPrequels.error 
    });
    return <ErrorMessage />;
  }

  if (!film.data || !staff.data || !sequelsAndPrequels.data) {
    return (
      <Box 
        display={"flex"} 
        flexDirection="column"
        justifyContent={"center"} 
        alignItems="center"
        margin={"auto"}
        minHeight="50vh"
        gap={2}
      >
        <Typography variant="h6" color="error">
          Не удалось загрузить данные о фильме
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{ 
          display: "grid", 
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr",
            md: "300px 1fr 200px",
            lg: "300px 1fr 250px"
          },
          gap: { xs: 2, sm: 3, md: 2 },
          paddingTop: { xs: "60px", sm: "80px" },
          paddingX: { xs: 1, sm: 2 }
        }}
      >
        {/* Постер фильма */}
        <Box 
          sx={{ 
            display: "flex",
            justifyContent: "center",
            order: { xs: 1, md: 1 }
          }}
        >
          <img 
            src={film.data.posterUrl} 
            alt={film.data.nameRu} 
            style={{ 
              width: "100%", 
              maxWidth: "300px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }} 
          />
        </Box>

        {/* Основная информация о фильме */}
        <Box 
          sx={{ 
            order: { xs: 2, md: 2 },
            minWidth: 0 // Предотвращает переполнение
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexWrap: "wrap" }}>
            <Button
              startIcon={<ArrowBack />}
              size="large"
              onClick={() => navigate(-1)}
              sx={{ mr: 2, mb: { xs: 1, sm: 0 } }}
            />
            <Typography 
              variant={"h5"} 
              sx={{ 
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                wordBreak: "break-word"
              }}
            >
              {film.data.nameRu}
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr"
              },
              gap: 1,
              mb: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Год</Typography>
            <Typography gutterBottom>{film.data.year}</Typography>
            
            <Typography sx={{ fontWeight: "bold" }}>Страна</Typography>
            <Typography gutterBottom>
              {film.data.countries.map(({ country }: { country: string }) => (
                <Typography key={country} component="span" sx={{ mr: 1 }}>
                  {country}
                </Typography>
              ))}
            </Typography>
            
            <Typography sx={{ fontWeight: "bold" }}>Жанры</Typography>
            <Typography gutterBottom>
              {film.data.genres.map(({ genre }: { genre: string }) => (
                <Typography key={genre} component="span" sx={{ mr: 1 }}>
                  {genre}
                </Typography>
              ))}
            </Typography>
            
            <Typography sx={{ fontWeight: "bold" }}>Режиссеры</Typography>
            <Typography gutterBottom>
              {staff.data
                .filter((el: any) => el.professionText === "Режиссеры")
                .map(({ nameRu }: { nameRu: string }) => (
                  <Typography key={nameRu} component="span" sx={{ mr: 1 }}>
                    {nameRu}
                  </Typography>
                ))}
            </Typography>
            
            <Typography sx={{ fontWeight: "bold" }}>Время</Typography>
            <Typography gutterBottom>{film.data.length} мин</Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Описание
            </Typography>
            <Typography sx={{ lineHeight: 1.6 }}>
              {film.data.description
                ? film.data.description
                : "Описание отсутствует"}
            </Typography>
          </Box>
        </Box>

        {/* Актеры */}
        <Box 
          sx={{ 
            order: { xs: 3, md: 3 },
            mt: { xs: 2, md: 0 }
          }}
        >
          <Typography variant="h6" gutterBottom>
            В главных ролях
          </Typography>
          {staff.data && staff.data.filter((el: any) => el.professionText === "Актеры").length > 0 ? (
            staff.data
              .filter((el: any) => el.professionText === "Актеры")
              .slice(0, 10)
              .map(({ nameRu }: { nameRu: string }) => (
                <Typography 
                  gutterBottom 
                  key={nameRu} 
                  display="block"
                  sx={{ 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.4
                  }}
                >
                  {nameRu}
                </Typography>
              ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Информация об актерах недоступна
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          px: { xs: 1, sm: 2 }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
            width: { xs: "100%", sm: "auto" }
          }}
        >
          <ButtonGroup 
            variant="outlined" 
            orientation="horizontal"
            sx={{ 
              width: { xs: "100%", sm: "auto" },
              "& .MuiButton-root": {
                minWidth: { xs: "100%", sm: "120px" },
                fontSize: { xs: "0.9rem", sm: "1rem" }
              }
            }}
          >
          <Button component="a" target="_blank" href={film.data.webUrl}>
            Кинопоиск
          </Button>
          <Button
            component="a"
            target="_blank"
            href={`https://www.imdb.com/title/${film.data.imdbId}`}
          >
            IMDB
          </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          flexDirection: "column",
          mt: 4,
          px: { xs: 1, sm: 2 }
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            textAlign: "center"
          }}
        >
          Смотреть онлайн
        </Typography>
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
          <VideoPlayer
            filmData={{
              nameRu: film.data.nameRu,
              kinopoiskId: id,
            }}
          />
        </Box>
        
        <Typography 
          variant="h5"
          sx={{ 
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            textAlign: "center",
            mt: 3
          }}
        >
          Сиквелы и приквелы
        </Typography>
        
        {sequelsAndPrequels.data && sequelsAndPrequels.data.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(auto-fit, minmax(200px, 1fr))",
                md: "repeat(auto-fit, minmax(250px, 1fr))",
                lg: "repeat(auto-fit, minmax(280px, 1fr))"
              },
              gap: { xs: 2, sm: 2, md: 3 },
              width: "100%",
              maxWidth: "1200px",
              justifyItems: "center"
            }}
          >
            {sequelsAndPrequels.data.map((el: any) => (
              <Box key={el.id} sx={{ width: "100%" }}>
                <MovieCard movie={el} />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
            Сиквелы и приквелы не найдены
          </Typography>
        )}
      </Box>
    </>
  );
};
export default MovieDetails;
