import { auth } from '@/lib/auth';

export default async function SignIn() {
  const session = await auth();
  if (!session) return null;

  return <div>{session?.user?.email}</div>;
}
