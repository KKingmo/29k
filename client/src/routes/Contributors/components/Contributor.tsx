import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../../../../../shared/src/constants/colors';
import {LinkIcon} from '../../../common/components/Icons';
import {Spacer8} from '../../../common/components/Spacers/Spacer';
import {Body14} from '../../../common/components/Typography/Body/Body';
import {SPACINGS} from '../../../common/constants/spacings';

export type Contributor = {
  name: string;
  avatar_url: string;
  profile: string;
  contributions: string[];
};

const ContributorWrapper = styled(TouchableOpacity)({
  width: '33%',
  padding: SPACINGS.EIGHT,
});

const Profile = styled.View({
  width: '100%',
  aspectRatio: '1',
  overflow: 'hidden',
});

const Image = styled.Image({
  width: '100%',
  height: '100%',
});

const IconContainer = styled.View({
  width: '25%',
  height: '25%',
  backgroundColor: COLORS.BLACK,
  borderRadius: 200,
  position: 'absolute',
  right: 0,
  bottom: 0,
});

const Name = styled(Body14)({
  textAlign: 'center',
});

export const Contributor: React.FC<{contributor: Contributor}> = ({
  contributor,
}) => (
  <ContributorWrapper
    onPress={() => Linking.openURL(contributor.profile)}
    disabled={!contributor.profile}>
    <Profile>
      <Image source={{uri: contributor.avatar_url}} />
      {Boolean(contributor.profile) && (
        <IconContainer>
          <LinkIcon fill={COLORS.WHITE} />
        </IconContainer>
      )}
    </Profile>
    <Spacer8 />
    <Name>{contributor.name}</Name>
  </ContributorWrapper>
);