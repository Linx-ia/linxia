import Link from "next/link";

import type { RouterOutputs } from "@linxia/api";

export default function AgentCard(props: {
  agent: RouterOutputs["agent"]["list"]["agents"][number];
}) {
  const { agent } = props;
  return (
    <Link href={`/dashboard/agent/${agent.id}`}>
      <div className="group relative">
        <div className="relative flex min-h-52 flex-col justify-between space-y-10 rounded-lg border border-gray-100 bg-white p-6 shadow transition-all hover:shadow-lg">
          <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-lg bg-gradient-to-r from-primary via-purple-800 to-secondary"></span>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="max-w-[200px] truncate text-lg font-medium text-gray-700">
                  {agent.name}
                </h2>
                <div className="flex items-center">
                  <p className="text-justify text-gray-500">
                    {agent.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-fit whitespace-nowrap rounded-full border border-black bg-black px-2 py-px text-xs font-medium capitalize text-white">
              Privado
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              {agent.modelName}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
