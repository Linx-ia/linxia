/* eslint-disable @typescript-eslint/no-empty-function */

"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

import { useAddEditAgentModal } from "~/components/models/add-edit-agent-model";

export const ModalContext = createContext<{
  setShowAddEditAgentModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowAddEditAgentModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { setShowAddEditAgentModal, AddEditAgentModal } =
    useAddEditAgentModal();

  return (
    <ModalContext.Provider
      value={{
        setShowAddEditAgentModal,
      }}
    >
      <AddEditAgentModal />
      {children}
    </ModalContext.Provider>
  );
}
