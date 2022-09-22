import {
  CARD_FIELD,
  ID_FIELD,
  VIDEO_FIELD,
  NAME_FIELD,
  PUBLISHED_FIELD,
} from './common';
import {
  CONTENT_SLIDE,
  PARTICIPANT_SPOTLIGHT_SLIDE,
  REFLECTION_SLIDE,
  SHARING_SLIDE,
} from './slides';

const INTRO_PORTAL = {
  label: 'Intro Portal',
  name: 'introPortal',
  widget: 'object',
  collapsed: true,
  required: false,
  i18n: true,
  fields: [
    {...VIDEO_FIELD, label: 'Video Loop', name: 'videoLoop'},
    {...VIDEO_FIELD, label: 'Video End', name: 'videoEnd'},
  ],
};

export default [
  ID_FIELD,
  NAME_FIELD,
  PUBLISHED_FIELD,
  CARD_FIELD,
  INTRO_PORTAL,
  {
    label: 'Slides',
    name: 'slides',
    widget: 'list',
    i18n: true,
    types: [
      CONTENT_SLIDE,
      REFLECTION_SLIDE,
      SHARING_SLIDE,
      PARTICIPANT_SPOTLIGHT_SLIDE,
    ],
  },
];
