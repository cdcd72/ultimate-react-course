import { LoaderFunction } from 'react-router-dom';

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<
  ReturnType<TLoaderFn>
> extends Response | infer D
  ? D
  : never;

export type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};
