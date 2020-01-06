import React from 'react';
import PropTypes from 'prop-types';

import logo from '~/assets/header_logo.png';
import {
    Container,
    LogoWrapper,
    Logo,
} from './styles';

export default function Header() {
    return (
        <Container>
            <LogoWrapper>
                <Logo source={logo} />
            </LogoWrapper>
        </Container>
    );
}

Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
};
