import { Checkbox } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type MyFormDate = {
  isChecked: boolean;
};

export default function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MyFormDate>();

  const onSubmit: SubmitHandler<MyFormDate> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="isChecked"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Checkbox onChange={onChange} value={value} />
        )}
      />
      {errors.isChecked && <label>ラベルをチェックしてください</label>}
      <input type="submit" />
    </form>
  );
}
