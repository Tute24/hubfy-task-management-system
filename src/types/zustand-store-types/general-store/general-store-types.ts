export type GeneralStoreState = {
  isLoading: boolean;
  statusMessage: string | null;
  hasHydrated: boolean;
};

export type GeneralStoreAction = {
  setIsLoading: (isLoading: boolean) => void;
  setStatusMessage: (statusMessage: string | null) => void;
};

export type GeneralStoreType = GeneralStoreState & GeneralStoreAction;
