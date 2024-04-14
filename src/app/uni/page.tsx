import { auth } from '@/lib/auth';
import { Heading } from '@radix-ui/themes';

export default async function SignIn() {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="size-full flex text-center flex-col gap-4 items-center lg:py-32 py-64">
      <Heading className="text-neutral-300">Hi {session.user.name}!</Heading>
      <span className="text-neutral-500">
        Wähle eine Datei in der Sidebar aus.
      </span>
    </div>
  );
}
