export interface MylistStore {
  list$: () => void;
  get$: () => void;
  add$: () => void;
  remove$: () => void;
  update$: () => void;
}
