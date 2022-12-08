import {BackendModule, ReadCallback} from 'i18next';
import {clone} from 'ramda';
import content from '../../../../../content/content.json';
import {
  LANGUAGE_TAG,
  DEFAULT_LANGUAGE_TAG,
} from '../../../../../shared/src/constants/i18n';
import {removeHiddenExercises} from '../../../../../shared/src/i18n/utils';
import useAppState from '../../appState/state/state';

type Namespace = keyof typeof content.i18n[typeof DEFAULT_LANGUAGE_TAG];

const Backend: BackendModule = {
  type: 'backend',
  init: function () {},
  read: function (
    language: LANGUAGE_TAG,
    namespace: Namespace,
    callback: ReadCallback,
  ) {
    if (namespace === 'exercises') {
      const showNonPublishedContent = useAppState.getState().showHiddenContent;
      const resources = content.i18n[language] as {
        ['exercises']: {} | undefined;
      }; // exercises does not exist for all languages, need to cast here

      if (showNonPublishedContent) {
        callback(null, resources.exercises);
      } else if (resources.exercises) {
        // Default load only non hidden
        const exercises = clone(resources);
        const onlyNonHiddenExercises = removeHiddenExercises(
          exercises.exercises,
        );

        callback(null, onlyNonHiddenExercises);
      }
    } else {
      callback(null, content.i18n[language][namespace]);
    }
  },
};

export default Backend;
