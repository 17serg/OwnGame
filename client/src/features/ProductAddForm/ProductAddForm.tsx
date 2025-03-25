import { IProductCreateData } from "@/entities/product/model";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid2 } from "@mui/material";
import { useProduct } from "@/entities/product/hooks/useProduct";

export default function ProductAddForm(): React.JSX.Element {
  const { addHandler } = useProduct();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IProductCreateData>({
    defaultValues: {
      title: "",
      desc: "",
      url: "",
      price: 0,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IProductCreateData> = (data) => {
    addHandler({
      title: data.title,
      desc: data.desc,
      url: data.url,
      price: Number(data.price),
    })
      .then(() => reset())
      .catch(console.log);
  };

  return (
    <Grid2 container justifyContent="center">
      <Box
        component="form"
        py={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              variant="outlined"
              label="Title"
              type="text"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ minWidth: 200 }}
            />
          )}
        />

        <Controller
          name="desc"
          control={control}
          rules={{
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 500,
              message: "Description must not exceed 500 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              variant="outlined"
              label="Description"
              type="text"
              error={!!errors.desc}
              helperText={errors.desc?.message}
              sx={{ minWidth: 200 }}
              //   multiline
              rows={2}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            min: {
              value: 0.1,
              message: "Price must be greater than 0",
            },
            max: {
              value: 100,
              message: "Price must be less than 100",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              variant="outlined"
              label="Price"
              type="number"
              inputProps={{ step: "0.1", min: "0.1" }}
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{ minWidth: 120 }}
            />
          )}
        />

        <Controller
          name="url"
          control={control}
          rules={{
            required: "URL is required",
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,63})(:\d{1,5})?([\/?#]\S*)?$/i,
              message: "Enter a valid URL (e.g., https://example.com)",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              variant="outlined"
              label="URL"
              type="url"
              error={!!errors.url}
              helperText={errors.url?.message}
              sx={{ minWidth: 250 }}
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={Object.keys(errors).length > 0 || !isDirty}
          sx={{ height: 40 }}
        >
          Add Product
        </Button>
      </Box>
    </Grid2>
  );
}
