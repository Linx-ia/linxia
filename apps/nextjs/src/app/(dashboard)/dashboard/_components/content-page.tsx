"use client";

import { DashboardShell } from "@linxia/ui";

import AgentCard from "~/components/agente-card";
import { useAddEditAgentModal } from "~/components/models/add-edit-agent-model";

interface Agent {
  name: string;
  description: string | null;
  modelName: "gpt_3_5_turbo";
  id: string;
}

interface ContentPageProps {
  agents: Agent[];
}

export default function ContentPage({ agents }: ContentPageProps) {
  const { AddEditAgentModal, AddAgentButton } = useAddEditAgentModal();
  return (
    <>
      <DashboardShell title="Meus Agentes" headerAction={<AddAgentButton />}>
        <AddEditAgentModal />

        <div className="my-10 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {agents.length > 0 &&
            agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}
        </div>
      </DashboardShell>
    </>
  );
}
