import { api } from "~/trpc/server"
import ContentPage from "./_components/content-page"

export default async function HomeDash() {
  const { agents } = await api.agent.list.query()
  return <ContentPage agents={agents} />
}
