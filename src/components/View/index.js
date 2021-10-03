import { useParams } from "react-router";

export default function View() {
  let { id } = useParams();

  return <div>mostrando história {id}</div>;
}
