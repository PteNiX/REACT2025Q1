import { Result } from './ResultState';

export interface AppState {
  results: Result[];
  loading: boolean;
  errorMessage: string | null;
  errorTriggered: boolean;
}
