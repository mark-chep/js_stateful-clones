'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_HISTORY = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  let currentState = structuredClone(state);

  for (const action of actions) {
    let stateCopy = structuredClone(currentState);

    switch (action.type) {
      case ADD_PROPERTIES:
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR:
        stateCopy = {};
        break;
    }

    STATE_HISTORY.push(stateCopy);
    currentState = stateCopy;
  }

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;
