import Title from "../../../../components/Title";
import useTitle from "../../../../states/Title";

export default function KeepUsers() {
  useTitle("Manter Usuários");
  return (
    <div>
      <Title
        title={"Gerenciar Tags"}
        description={"Crie, edite ou exclua tags de pesquisa"}
      />
    </div>
  );
}
