import * as Icons from "./icons";

function IconLoader() {
  return <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />;
}

/**
 * @deprecated This icon component should not be used.
 * Please use lucide react icons instead.
 *
 * Replace with:
 * import { loader } from 'lucide-react'
 */
export default IconLoader;
