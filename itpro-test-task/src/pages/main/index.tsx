import { ControlPanel } from "@/widgets/ControlPanel";
import { AppTable } from "@/widgets/AppTable";
import { useAppState } from "@/shared/store/appSlice";
import { Fallback } from "@/widgets/Fallback";

import s from "./styles.module.scss";

export const MainPage = () => {
  const { isError, isLoading } = useAppState((state) => state);
  console.log(isError, isLoading);

  return (
    <div className={s.wrapper}>
      <ControlPanel />
      <AppTable />
      {isError && <Fallback />}
    </div>
  );
};
