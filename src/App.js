import { useForm } from "react-hook-form";
import "./App.css";
import SearchInput from "./components/SearchInput";

function App() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div className="App">
      <SearchInput
        name="searchSong"
        id="searchSong"
        rules={{}}
        label=""
        register={register}
        errors={errors}
        placeHolderText="Search to get the result"
      />
    </div>
  );
}

export default App;
