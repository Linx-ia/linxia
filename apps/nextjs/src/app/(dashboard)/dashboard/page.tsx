"use client";

import { DashboardShell } from "@linxia/ui";

import Chat from "~/components/chat";
import { useAddEditAgentModal } from "~/components/models/add-edit-agent-model";

export default function HomeDash() {
  const { AddEditAgentModal, AddAgentButton } = useAddEditAgentModal();
  return (
    <>
      <AddEditAgentModal />
      <DashboardShell title="Teste">
        <AddAgentButton />
        <h1>ds</h1>
        <Chat />
      </DashboardShell>
    </>
  );
}
