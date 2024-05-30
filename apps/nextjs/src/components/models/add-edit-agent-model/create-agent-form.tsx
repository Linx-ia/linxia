import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import type { CreateProject } from "@linxia/api/validators";
import { createAgentSchema } from "@linxia/api/validators";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InfoTooltip,
  Input,
  LogoLinx,
  Textarea,
} from "@linxia/ui";

import { useZodForm } from "~/lib/zod-form";
import { api } from "~/trpc/client";

export const CreateAgentForm = (props: { onSuccess?: () => void }) => {
  const [loading, SetLoading] = useState(false);

  const router = useRouter();
  const onError = (errors: FieldErrors) => {
    console.error("Erros de validação:", errors);
  };

  const form = useZodForm({
    schema: createAgentSchema,
    defaultValues: {
      promptSystem:
        "Seu nome é Lais e você é especialista em suporte ao cliente na Linxia Como agente de suporte ao cliente, forneça uma resposta útil e profissional à pergunta ou problema do usuário. O telefone de suporte é 3003-5790 e para o departamento de Administrativo Financeiro o telefone é (11) 2103-4321. Responda brevemente. Injete humor, diversão e um tom espirituoso no conteúdo. Você pode usar emojis.",
    },
  });

  async function onSubmit(data: CreateProject) {
    try {
      SetLoading(true);
      await api.agent.create.mutate(data);
      if (props.onSuccess) {
        props.onSuccess();
      }

      router.refresh();
      toast.success(`Agente ${data.name} criado com sucesso`);
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
      toast.error("Erro ao criar Agente", {
        description:
          "Não foi possível realizar o cadastro do agente. Por favor, tente novamente.",
      });
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <LogoLinx className="h-10 w-10" />
        <h1 className="text-lg font-medium"> Agente</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 text-left sm:px-16"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormDescription>
                  Nome de identificação do Agent
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promptSystem"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Prompt do sistema</FormLabel>
                  <InfoTooltip
                    content={`Entrada de informação ou instrução dada pelo usuário para orientar a IA a realizar uma tarefa específica ou gerar uma resposta desejada`}
                  />
                </div>

                <FormControl>
                  <Textarea {...field} rows={5} className="resize-none" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button loading={loading} htmlType={"submit"}>
            Criar agente
          </Button>
        </form>
      </Form>
    </>
  );
};
