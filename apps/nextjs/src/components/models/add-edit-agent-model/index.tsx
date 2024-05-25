"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback, useMemo, useState } from "react";

import type { ButtonProps } from "@linxia/ui";
import {
  Button,
  InfoTooltip,
  Input,
  LogoLinx,
  Modal,
  Textarea,
} from "@linxia/ui";

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
      className="scrollbar-hide h-fit max-h-[95vh] overflow-auto"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <LogoLinx className="h-10 w-10" />
        <h1 className="text-lg font-medium"> Agente</h1>
      </div>
      <form
        action=""
        className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 text-left sm:px-16"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="nome">
            <h2 className="text-sm font-medium text-gray-700">Nome</h2>
          </label>
        </div>
        <Input
          name="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
        <div className="flex items-center justify-between">
          <label htmlFor="nome">
            <h2 className="text-sm font-medium text-gray-700">Descrição</h2>
          </label>
        </div>
        <Input
          name="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
        />
        <div className="flex items-center justify-between">
          <label htmlFor="nome">
            <h2 className="text-sm font-medium text-gray-700">
              Prompt do sistema
            </h2>
          </label>
          <InfoTooltip
            content={`Entrada de informação ou instrução dada pelo usuário para orientar a IA a realizar uma tarefa específica ou gerar uma resposta desejada`}
          />
        </div>
        <Textarea rows={5} className="resize-none" />
        <Button htmlType={"submit"}>Criar agente</Button>
      </form>
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
