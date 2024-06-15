import {ChatBubble} from "@linxia/chat"
import {CreateElement} from "@linxia/chat"
import { cn } from "@linxia/utils";

const name = 'linxia-chatbox-bubble';

const element = CreateElement({
  widget: (props: any) => (
    <ChatBubble
      {...props}
      className={cn('chaindesk-widget', props.className)}
    />
  ),
});

customElements.define(name, element);

export default element;