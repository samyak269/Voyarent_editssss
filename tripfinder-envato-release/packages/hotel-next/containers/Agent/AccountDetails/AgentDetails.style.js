import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const AgentDetailsPage = styled.div``;

export const BannerSection = styled.div`
  height: 400px;
  background-color: #e9e8ec;
  position: relative;
`;

export const UserInfoArea = styled.div`
  margin-top: -139px;
`;

export const ProfileImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 3px;
  margin-bottom: 27px;
  background-color: #e9e8ec;
  border: 5px solid ${themeGet('color.1', '#ffffff')};
  box-shadow: 0 3px 6px ${themeGet('boxShadow.1', 'rgba(26, 68, 116, 0.16)')};
  position: relative;
  overflow: hidden;
`;

export const ProfileInformationArea = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 667px) {
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 30px;
  }
`;

export const ProfileInformation = styled.div`
  > * {
    max-width: 864px;
    width: 100%;
  }

  h2 {
    font-size: 25px;
    line-height: 28px;
    font-weight: 700;
    color: ${themeGet('text.0', '#2C2C2C')};
    margin-bottom: 23px;
  }

  p {
    font-size: 15px;
    line-height: 25px;
    color: ${themeGet('text.0', '#2C2C2C')};
    margin-bottom: 30px;
  }
`;

export const SocialAccount = styled.div`
  flex-shrink: 0;

  a {
    margin: 0 20px;

    @media (min-width: 1441px) {
      margin: 0 30px;
    }
  }

  svg {
    width: 18px;
    height: 18px;

    fill: ${themeGet('color.6', '#273343')};
    cursor: pointer;
    transition: all 0.2s ease;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.twitter {
      &:hover {
        fill: ${themeGet('color.8', '#55ADEE')};
      }
    }

    &.facebook {
      &:hover {
        fill: ${themeGet('color.7', '#3b5998')};
      }
    }

    &.instagram {
      &:hover {
        fill: ${themeGet('color.12', '#e4405f')};
      }
    }
  }
`;

export const NavigationArea = styled.div`
  margin-bottom: 30px;
  border-top: 1px solid ${themeGet('border.3', '#E6E6E6')};
  border-bottom: 1px solid ${themeGet('border.3', '#E6E6E6')};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 667px) {
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      padding-left: 25px;
      padding-right: 25px;
      padding-bottom: 20px;
    }
  }

  .add_card {
    display: inline-flex;
    align-items: center;
    padding: 11px 22px;
    border-radius: 3px;
    font-size: 15px;
    text-transform: capitalize;
    color: ${themeGet('color.1', '#ffffff')};
    background-color: ${themeGet('primary.0', '#008489')};
    transition: all 0.3s ease;

    @media (max-width: 480px) {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    svg {
      font-size: 22px;
      margin-right: 5px;
      margin-left: -5px;
    }

    &:hover,
    &:focus {
      background-color: ${themeGet('primary.1', '#399C9F')};
    }
  }

  .ant-menu {
    border: 0;
    display: flex;
    align-items: center;
    box-shadow: none;

    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
      padding-bottom: 10px;
    }

    li {
      height: auto;
      line-height: 1;
      margin-right: 16px;

      @media (max-width: 480px) {
        width: 100%;
        margin-right: 0;
      }

      a {
        display: block;
        font-size: 15px;
        line-height: 25px;
        padding: 23px 10px;
        color: ${themeGet('text.0', '#2C2C2C')};
        position: relative;

        @media (max-width: 480px) {
          padding: 15px 10px;
        }

        &::after {
          content: '';
          display: block;
          width: 0%;
          height: 2px;
          border-radius: 4px;
          position: absolute;
          left: 0;
          bottom: 0;
          opacity: 0;
          visibility: hidden;
          background-color: ${themeGet('primary.0', '#008489')};
          transition: all 0.3s ease;
        }

        &.active {
          font-weight: 700;

          &::after {
            opacity: 1;
            visibility: visible;
            width: 100%;
          }
        }

        &:hover {
          &::after {
            opacity: 1;
            visibility: visible;
            width: 100%;
          }
        }

        &:hover,
        &:focus {
          text-decoration: none;
        }
      }
    }
  }
`;

export const AgentContactWrapper = styled.div`
  padding: 25px 0 30px;

  > h2 {
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 25px;
    line-height: 30px;
    font-weight: 700;
    margin-bottom: 22px;

    @media (max-width: 480px) {
      font-size: 17px;
      line-height: 21px;
    }
  }

  > .ant-row {
    > div {
      @media (max-width: 991px) {
        margin-bottom: 40px;
      }
    }
  }
`;

export const ContactDetails = styled.div`
  border-radius: 3px;
  padding: 30px;
  box-sizing: border-box;
  background-color: ${themeGet('color.2', '#F7F7F7')};

  > h3 {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

export default AgentDetailsPage;
