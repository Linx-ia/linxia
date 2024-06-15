import { InitWidgetProps } from "../../chat/src/common/types";

const setupAttributes = (
  props: {
    element: HTMLElement;
  } & InitWidgetProps 
) => {
  if (props.agentId) {
    props.element.setAttribute('agent-id', props.agentId || '');
  }

  if (props.id) {
    props.element.setAttribute('id', props.id);
  }

  if (props.context) {
    props.element.setAttribute('context', props.context);
  }

  return props.element;
};

export default setupAttributes;
