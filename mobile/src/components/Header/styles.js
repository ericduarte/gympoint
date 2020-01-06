import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-bottom-width: 1px;
    border-bottom-color: #e3e3e3;
`;

export const LogoWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

export const Logo = styled.Image`
    margin: 13px 0;
`;
