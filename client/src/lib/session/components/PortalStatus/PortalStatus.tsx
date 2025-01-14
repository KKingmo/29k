import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Spacer8} from '../../../components/Spacers/Spacer';
import useSessionState from '../../state/state';
import useDailyState from '../../../daily/state/state';
import Badge from '../../../components/Badge/Badge';
import useSessionStartTime from '../../../session/hooks/useSessionStartTime';
import styled from 'styled-components/native';
import {Body14} from '../../../components/Typography/Body/Body';
import Gutters from '../../../components/Gutters/Gutters';
import {COLORS} from '../../../../../../shared/src/constants/colors';
import {HKGroteskBold} from '../../../constants/fonts';

export const StatusItem = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

export const StatusText = styled(Body14)<{themeColor?: string}>(
  ({themeColor}) => ({
    color: themeColor ? themeColor : COLORS.PURE_WHITE,
    fontFamily: HKGroteskBold,
  }),
);

export const Container = styled(Gutters)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PortalStatus: React.FC = () => {
  const {t} = useTranslation('Screen.Portal');
  const exercise = useSessionState(state => state.exercise);
  const textColor = exercise?.theme?.textColor;
  const sessionState = useSessionState(state => state.sessionState);
  const startTime = useSessionState(state => state.liveSession?.startTime);
  const sessionTime = useSessionStartTime(dayjs(startTime));
  const started = sessionState?.started;
  const participants = useDailyState(state => state.participants);
  const participantsCount = Object.keys(participants ?? {}).length;

  return (
    <Container>
      <StatusItem>
        <StatusText themeColor={textColor}>
          {sessionTime.isStartingShortly
            ? t('counterLabel.starts')
            : t('counterLabel.startsIn')}
        </StatusText>
        <Spacer8 />

        <Badge
          themeColor={textColor ?? textColor}
          text={
            started
              ? t('counterLabel.started')
              : sessionTime.isStartingShortly
                ? t('counterLabel.shortly')
                : sessionTime.time
          }
        />
      </StatusItem>

      {participantsCount > 1 && (
        <StatusItem>
          <StatusText themeColor={textColor}>{t('participants')}</StatusText>
          <Spacer8 />
          <Badge themeColor={textColor} text={participantsCount} />
        </StatusItem>
      )}
    </Container>
  );
};

export default React.memo(PortalStatus);
