import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";
import SearchUser from "../../../../components/SearchUser";

export default function SelectUser() {
  useTitle("Selecionar Usuário");
  const data = [
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=1", id: 1 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=2", id: 2 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=3", id: 3 },
    { user: "João", profile_pic: "https://i.pravatar.cc/150?img=4", id: 4 },
  ];
  return (
    <div>
      <Title
        title={"Selecionar Usuário"}
        description={"Procure por um usuário específico "}
      />

      <SearchUser data={data} />
    </div>
  );
}
