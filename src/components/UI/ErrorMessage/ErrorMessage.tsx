import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorMessage = () => {
  const navigate = useNavigate();
  return (
    <Stack flexDirection={"column"} margin={"auto"} alignItems={"center"}>
      <Typography variant="h6">Произошла ошибка</Typography>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />}>
        Назад
      </Button>
    </Stack>
  );
};
export default ErrorMessage;
