import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

import Gutters from '../../../lib/components/Gutters/Gutters';

import Image from '../../../lib/components/Image/Image';
import SheetModal from '../../../lib/components/Modals/SheetModal';

import {
  ModalStackProps,
  AppStackProps,
} from '../../../lib/navigation/constants/routes';

import useExerciseById from '../../../lib/content/hooks/useExerciseById';

import {formatContentName} from '../../../lib/utils/string';

import {
  BottomSafeArea,
  Spacer16,
  Spacer32,
  Spacer4,
} from '../../../lib/components/Spacers/Spacer';
import {Display24} from '../../../lib/components/Typography/Display/Display';
import {Body16} from '../../../lib/components/Typography/Body/Body';
import Byline from '../../../lib/components/Bylines/Byline';

import SessionTimeBadge from '../../../lib/components/SessionTimeBadge/SessionTimeBadge';
import {COLORS} from '../../../../../shared/src/constants/colors';

import {SPACINGS} from '../../../lib/constants/spacings';
import Markdown from '../../../lib/components/Typography/Markdown/Markdown';
import Tag from '../../../lib/components/Tag/Tag';
import useGetSessionCardTags from '../../../lib/components/Cards/SessionCard/hooks/useGetSessionCardTags';
import {LiveSessionType} from '../../../../../shared/src/schemas/Session';
import {
  getSessionByHostingCode,
  acceptHostingInvite,
} from '../../../lib/sessions/api/session';
import Button from '../../../lib/components/Buttons/Button';
import {JoinSessionError} from '../../../../../shared/src/errors/Session';
import SessionUnavailableModal from '../SessionUnavailableModal/SessionUnavailableModal';
import HostingInviteFailModal from '../HostingInviteFailModal/HostingInviteFailModal';

const Content = styled(Gutters)({
  justifyContent: 'space-between',
});

const SpaceBetweenRow = styled(View)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'flex-end',
});

const TitleContainer = styled.View({
  flex: 2,
});

const ImageContainer = styled(Image)({
  aspectRatio: '1',
  flex: 1,
  height: 90,
});

const Tags = styled(Gutters)({
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: -SPACINGS.FOUR,
});

const InvitationModal: React.FC<{
  session: LiveSessionType;
  hostingCode: number;
  fetchSession: Function;
}> = ({session, hostingCode}) => {
  const exercise = useExerciseById(session?.exerciseId);
  const tags = useGetSessionCardTags(exercise);
  const {t} = useTranslation('Modal.HostSessionByInvite');

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackProps & ModalStackProps>>();

  const acceptInvite = useCallback(async () => {
    if (session?.id) {
      const updatedSession = await acceptHostingInvite(session.id, hostingCode);
      navigation.navigate('SessionModal', {
        session: updatedSession,
      });
    }
  }, [session?.id, hostingCode, navigation]);

  const onCancel = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <BottomSheetScrollView focusHook={useIsFocused}>
      <Spacer16 />

      <Content>
        <SpaceBetweenRow>
          <TitleContainer>
            <Display24>{formatContentName(exercise)}</Display24>
            <Spacer4 />
            <Row>
              <Byline
                pictureURL={session.hostProfile?.photoURL}
                name={session.hostProfile?.displayName}
              />
            </Row>
          </TitleContainer>
          <Spacer32 />
          <ImageContainer
            resizeMode="contain"
            source={{uri: exercise?.card?.image?.source}}
          />
        </SpaceBetweenRow>
      </Content>
      {exercise?.description && (
        <>
          <Spacer16 />
          <Gutters>
            <Markdown>{exercise?.description}</Markdown>
          </Gutters>
        </>
      )}

      {tags && (
        <Tags>
          {tags.map((tag, idx) => (
            <Fragment key={`tag-${idx}`}>
              <Tag>{tag}</Tag>
              <Spacer4 />
            </Fragment>
          ))}
        </Tags>
      )}
      <Spacer16 />

      <Gutters>
        <Row>
          <SessionTimeBadge session={session} />
        </Row>
        <Spacer16 />
      </Gutters>

      <Gutters>
        <Body16>
          {t('description', {hostName: session.hostProfile?.displayName})}
        </Body16>
        <Spacer16 />
        <Row>
          <Button onPress={acceptInvite}>{t('confirm')}</Button>
          <Spacer16 />
          <Button variant={'secondary'} onPress={onCancel}>
            {t('cancel')}
          </Button>
        </Row>
      </Gutters>
      <BottomSafeArea minSize={SPACINGS.THIRTYTWO} />
    </BottomSheetScrollView>
  );
};

const HostSessionByInviteModal = () => {
  const {
    params: {hostingCode},
  } = useRoute<RouteProp<ModalStackProps, 'HostSessionByInviteModal'>>();

  const [session, setSession] = useState<LiveSessionType>();
  const [error, setError] = useState<string>();

  const fetchSession = useCallback(async () => {
    try {
      const fetchedSession = await getSessionByHostingCode(hostingCode);
      setSession(fetchedSession);
    } catch (err) {
      setError((err as Error).message as JoinSessionError);
    }
  }, [hostingCode]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  if (
    error === JoinSessionError.notAvailable ||
    error === JoinSessionError.notFound
  ) {
    return <SessionUnavailableModal />;
  } else if (error) {
    return <HostingInviteFailModal />;
  }

  return (
    <SheetModal backgroundColor={COLORS.CREAM}>
      {session ? (
        <InvitationModal
          session={session}
          hostingCode={hostingCode}
          fetchSession={fetchSession}
        />
      ) : null}
    </SheetModal>
  );
};

export default HostSessionByInviteModal;