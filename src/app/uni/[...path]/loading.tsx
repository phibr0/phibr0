import { Spinner } from '@radix-ui/themes';

export default function Loading() {
  return (
    <div className="size-full flex text-center flex-col gap-4 items-center lg:py-32 py-64">
      <Spinner size="3" />
    </div>
  );
}
