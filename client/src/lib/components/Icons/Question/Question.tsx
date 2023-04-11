import React from 'react';
import {ClipPath, Defs, G, Path} from 'react-native-svg';
import {IconType} from '..';
import {COLORS} from '../../../../../../shared/src/constants/colors';
import Icon from '../Icon';

export const QuestionIcon: IconType = ({fill = COLORS.BLACK}) => (
  <Icon>
    <G clipPath="url(#a)" fill={fill}>
      <Path d="M10.518 25.139c.536 0 .932-.264 1.582-.838l3.23-2.844h5.668c2.835 0 4.426-1.639 4.426-4.436V9.706c0-2.797-1.591-4.436-4.425-4.436H8.992c-2.825 0-4.426 1.639-4.426 4.436v7.316c0 2.807 1.648 4.436 4.36 4.436h.386v2.307c0 .838.443 1.375 1.206 1.375Zm.47-2.11v-2.683c0-.556-.244-.773-.772-.773H9.058c-1.77 0-2.618-.894-2.618-2.608V9.761c0-1.714.848-2.608 2.618-2.608h11.884c1.761 0 2.608.894 2.608 2.608v7.204c0 1.714-.847 2.608-2.608 2.608h-5.716c-.575 0-.857.095-1.253.509l-2.985 2.947Z" />
      <Path d="M14.582 15.276c.528 0 .857-.292.886-.678v-.113c.037-.49.367-.81.979-1.205.932-.612 1.526-1.158 1.526-2.241 0-1.564-1.413-2.468-3.09-2.468-1.61 0-2.711.735-3.003 1.62-.057.16-.094.33-.094.5 0 .451.357.734.79.734.556 0 .679-.283.961-.603.311-.47.706-.744 1.262-.744.744 0 1.224.424 1.224 1.055 0 .574-.395.885-1.186 1.44-.669.462-1.159.942-1.159 1.79v.103c0 .537.33.81.904.81Zm-.009 2.9c.603 0 1.102-.442 1.102-1.045 0-.593-.49-1.035-1.102-1.035-.612 0-1.111.442-1.111 1.035 0 .594.499 1.046 1.111 1.046Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h30v30H0z" />
      </ClipPath>
    </Defs>
  </Icon>
);