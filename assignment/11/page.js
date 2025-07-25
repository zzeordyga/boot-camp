import Image from "next/image";
import TaskList from "./component/TaskList";
import { UserSettingProvider } from "./context/useSettingContext";


export default function Home() {
  return (
    <UserSettingProvider>
      <TaskList></TaskList>

    </UserSettingProvider>
  );
}
