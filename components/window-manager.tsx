import { Box, type BoxProps } from "@chakra-ui/react";
import { useReducer, type Dispatch } from "react";

import { createCtx } from "lib/context";

export interface Window {
  id: string;
  isOpen: boolean;
}

export interface State {
  isPointerDragging: boolean;
  windows: Window[];
  fullScreen: string;
}

interface ForegroundAction {
  type: "foreground";
  id: string;
}
interface FullScreenAction {
  type: "fullScreen";
  id: string;
}

interface CloseAction {
  type: "close";
  id: string;
}

interface StartDragAction {
  type: "startDrag";
}

interface StopDragAction {
  type: "stopDrag";
}

export type Action =
  | ForegroundAction
  | FullScreenAction
  | CloseAction
  | StartDragAction
  | StopDragAction;

const initialState: State = {
  isPointerDragging: false,
  windows: [],
  fullScreen: ""
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "foreground":
      return {
        ...state,
        windows: [
          ...state.windows.filter(({ id }) => id !== action.id),
          {
            ...state.windows.find(({ id }) => id === action.id)!,
            id: action.id,
            isOpen: true
          }
        ]
      };
    case "close":
      return {
        ...state,
        windows: state.windows.map(({ id, isOpen }) => ({
          id,
          isOpen: id === action.id ? false : isOpen
        }))
      };
    case "startDrag":
      return {
        ...state,
        isPointerDragging: true
      };
    case "stopDrag":
      return {
        ...state,
        isPointerDragging: false
      };
    case "fullScreen":
      return {
        ...state,
        fullScreen: action.id
      };
  }
};

interface WindowManagerContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const [useWindowManager, WindowManagerProvider] =
  createCtx<WindowManagerContext>();

interface WindowManagerProps {
  children: React.ReactNode;
}

export const WindowManager = ({ children }: WindowManagerProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WindowManagerProvider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </WindowManagerProvider>
  );
};

interface ControllerProps extends BoxProps {
  id: string;
}

export const Open = ({ id, ...rest }: ControllerProps) => {
  const { dispatch } = useWindowManager();
  return <Box onClick={() => dispatch({ type: "foreground", id })} {...rest} />;
};

export const Close = ({ id, ...rest }: ControllerProps) => {
  const { dispatch } = useWindowManager();
  return <Box onClick={() => dispatch({ type: "close", id })} {...rest} />;
};
