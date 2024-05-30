"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback, useMemo, useState } from "react";

import type { ButtonProps } from "@linxia/ui";
import { Button, Modal } from "@linxia/ui";

import { CreateAgentForm } from "./create-agent-form";

function AddEditAgentModal({
  showAddEditAgentModal,
  setShowAddEditAgentModal,
}: {
  showAddEditAgentModal: boolean;
  setShowAddEditAgentModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      showModal={showAddEditAgentModal}
      setShowModal={setShowAddEditAgentModal}
    >
      <CreateAgentForm
        onSuccess={() => {
          setShowAddEditAgentModal(false);
        }}
      />
    </Modal>
  );
}

function AddAgentButton({
  setShowAddEditAgentModal,
  buttonProps,
}: {
  setShowAddEditAgentModal: Dispatch<SetStateAction<boolean>>;
  buttonProps?: Partial<ButtonProps>;
}) {
  return (
    <div>
      <Button onClick={() => setShowAddEditAgentModal(true)} {...buttonProps}>
        Novo agente
      </Button>
    </div>
  );
}

export function useAddEditAgentModal({
  buttonProps,
}: { buttonProps?: Partial<ButtonProps> } = {}) {
  const [showAddEditAgentModal, setShowAddEditAgentModal] = useState(false);

  const AddEditAgentModalCallback = useCallback(() => {
    return (
      <AddEditAgentModal
        showAddEditAgentModal={showAddEditAgentModal}
        setShowAddEditAgentModal={setShowAddEditAgentModal}
      />
    );
  }, [showAddEditAgentModal, setShowAddEditAgentModal]);

  const AddAgentButtonCallback = useCallback(() => {
    return (
      <AddAgentButton
        setShowAddEditAgentModal={setShowAddEditAgentModal}
        buttonProps={buttonProps}
      />
    );
  }, [setShowAddEditAgentModal, buttonProps]);

  return useMemo(
    () => ({
      setShowAddEditAgentModal,
      AddEditAgentModal: AddEditAgentModalCallback,
      AddAgentButton: AddAgentButtonCallback,
    }),
    [
      setShowAddEditAgentModal,
      AddEditAgentModalCallback,
      AddAgentButtonCallback,
    ],
  );
}
