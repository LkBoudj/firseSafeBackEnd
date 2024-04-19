import path from "path";
import { URL } from "url";

const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname.substring(1);

export const pathJoin = (folder_dir, ...props) =>
  path.join(__dirname, "public", folder_dir, props.join("/"));
