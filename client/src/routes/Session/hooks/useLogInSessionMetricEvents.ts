import dayjs from 'dayjs';
import {useCallback} from 'react';
import * as metrics from '../../../lib/metrics';
import useUser from '../../../lib/user/hooks/useUser';
import useSessionState from '../state/state';
import useSessionSlideState from './useSessionSlideState';

type AllowedSharingEvents =
  | 'Enter Changing Room'
  | 'Enter Intro Portal'
  | 'Start Sharing Session'
  | 'Enter Sharing Session'
  | 'Leave Sharing Session'
  | 'Complete Sharing Session'
  | 'Enter Outro Portal';

const useLogInSessionMetricEvents = () => {
  const user = useUser();
  const session = useSessionState(state => state.session);
  const slideState = useSessionSlideState();

  const logSessionMetricEvent = useCallback(
    (event: AllowedSharingEvents) => {
      if (session?.id && user?.uid) {
        metrics.logEvent(event, {
          'Sharing Session ID': session.id,
          'Sharing Session Type': session.type,
          'Sharing Session Start Time': session.startTime,
          'Sharing Session Duration': dayjs().diff(
            session.startTime,
            'seconds',
          ),
          'Exercise ID': session.contentId,
          Host: user.uid === session.hostId,
          Language: session.language,
        });
      }
    },
    [
      user?.uid,
      session?.id,
      session?.type,
      session?.startTime,
      session?.contentId,
      session?.hostId,
      session?.language,
    ],
  );

  const conditionallyLogLeaveSessionMetricEvent = useCallback(() => {
    if (slideState?.current && slideState?.next) {
      // Only log if Not on last slide
      logSessionMetricEvent('Leave Sharing Session');
    }
  }, [logSessionMetricEvent, slideState]);

  const conditionallyLogCompleteSessionMetricEvent = useCallback(() => {
    if (slideState?.current && !slideState?.next) {
      // Only log if on last slide
      logSessionMetricEvent('Complete Sharing Session');
    }
  }, [logSessionMetricEvent, slideState]);

  return {
    logSessionMetricEvent,
    conditionallyLogLeaveSessionMetricEvent,
    conditionallyLogCompleteSessionMetricEvent,
  };
};

export default useLogInSessionMetricEvents;