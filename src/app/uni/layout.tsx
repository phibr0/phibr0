import { ActionButton } from '@/components/common/ActionButton';
import { auth, signIn, signOut } from '@/lib/auth';
import {
  GitHubLogoIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { Avatar, Card, Popover, Skeleton, TextField } from '@radix-ui/themes';
import { PropsWithChildren, Suspense } from 'react';
import { gh } from './gh';
import { Sidebar } from './sidebar/Sidebar';

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session?.user?.username) {
    return (
      <form
        className="flex px-8 pt-64 justify-center items-center"
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <ActionButton icon={<GitHubLogoIcon />} size="3" type="submit">
          Authentifizieren
        </ActionButton>
      </form>
    );
  }

  const { data } = await gh().collaborators();
  if (!data.find((c) => c.login === session.user!.username)) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <nav className="fixed z-50 bg-neutral-900 shadow-2xl h-16 items-center px-8 top-0 w-full flex justify-between">
        <span className="font-bold">uni</span>
        <Popover.Root>
          <Popover.Trigger>
            <Avatar
              src={session.user.image}
              fallback={session.user.name[0]}
              alt="Avatar"
            />
          </Popover.Trigger>
          <Popover.Content asChild>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
              className="flex flex-col gap-2"
            >
              <span className="font-medium mb-2">{session.user.username}</span>
              <ActionButton type="submit" icon={<PersonIcon />}>
                Sign Out
              </ActionButton>
            </form>
          </Popover.Content>
        </Popover.Root>
      </nav>
      <div className="lg:grid pt-16 h-screen lg:grid-cols-[300px_auto] gap-4">
        <aside>
          <Suspense
            fallback={
              <Card className="m-4 space-y-2">
                <TextField.Root
                  variant="soft"
                  placeholder="Search"
                  className="mb-4"
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon />
                  </TextField.Slot>
                </TextField.Root>
                <Skeleton>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt corporis voluptates vero asperiores voluptas,
                  molestiae quisquam nostrum? Aperiam quod, nobis quisquam sequi
                  eligendi commodi cupiditate laboriosam eveniet explicabo
                </Skeleton>
              </Card>
            }
          >
            <Sidebar />
          </Suspense>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
