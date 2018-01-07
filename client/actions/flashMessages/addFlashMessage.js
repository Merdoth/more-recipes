import * as types from '../actionTypes';

export const addFlashMessage = message => ({
  type: types.ADD_FLASH_MESSAGE,
  message
});
