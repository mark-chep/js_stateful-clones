'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const STATE_HISTORY = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  let currentState = structuredClone(state);

  for (const action of actions) {
    let copyState = structuredClone(currentState);

    if (action.type === ADD_PROPERTIES) {
      for (const key in action.extraData) {
        copyState[key] = action.extraData[key];
      }
      STATE_HISTORY.push(copyState);
    }

    if (action.type === REMOVE_PROPERTIES) {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
      STATE_HISTORY.push(copyState);
    }

    if (action.type === CLEAR) {
      copyState = {};
      STATE_HISTORY.push(copyState);
    }

    currentState = copyState;
  }

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;
