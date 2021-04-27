import produce from 'immer';
import { getUuid } from '../../lib/getUuid';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;

      state.data[id].content = content;

      return state;
    }

    case ActionType.DELETE_CELL: {
      delete state.data[action.payload];

      state.order = state.order.filter((id) => id !== action.payload);

      return state;
    }

    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;

      const index = state.order.findIndex((orderId) => orderId === id);

      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;

      return state;
    }

    case ActionType.INSERT_CELL_BEFORE: {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: getUuid(),
      };

      state.data[cell.id] = cell;

      const index = state.order.findIndex(
        (orderId) => orderId === action.payload.id
      );

      if (index < 0) {
        state.order.push(cell.id);

        return state;
      }

      state.order.splice(index, 0, cell.id);

      return state;
    }

    default: {
      return state;
    }
  }
});

export default reducer;
