import { gh } from '../gh';
import { ClientSidebar } from './Client';

export async function Sidebar() {
  const data = await gh().files();
  return <ClientSidebar file={data} />;
}
