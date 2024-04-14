import { Spinner } from '@radix-ui/themes';

export default function Loading() {
  return (
    <div className="flex px-8 pt-64 justify-center items-center">
      <Spinner size="3" />
    </div>
  );
}
