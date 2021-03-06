import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import {
  Avatar, Button, Dropdown, Input, Layout, Menu, MenuProps, message, Space,
} from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
  FormOutlined,
  BellOutlined,
  ImportOutlined, GithubOutlined,
} from '@ant-design/icons';
import backGroundImage from '../../assets/amanohina.jpg';
import history from '@/utils/getHistory';
import styles from './styles.module.scss';
import { deleteUser, getUser, saveUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import { LoginInfo } from '@/services/entities';
import { ServicesApi } from '@/services/services-api';
import { addEvents } from '@/utils/addEventListenerForLocalStorage';

const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;

const { Login, getLoginInfo } = ServicesApi;

export interface BasicLayoutProps {
  // eslint-disable-next-line react/no-unused-prop-types
  example?: any
}

type MenuItem = Required<MenuProps>['items'][number];

interface IconsProps {
  icon: React.ReactNode
  clickEvent: () => void
  subTitle: string
}

addEvents();

const initLoginInputInfo = { email: '', password: '' };

const BasicLayout: React.FC<BasicLayoutProps> = ({ children, example }) => {
  const [userInfo, setUserInfo] = useState({ username: '', image: '' });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loginFlag, setLoginFlag] = useState(false);
  const [showLoginModalFlag, setShowLoginModalFlag] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo>(initLoginInputInfo);

  window.addEventListener('setItemEvent', () => {
    setLoginFlag(true);
  });
  window.addEventListener('removeItemEvent', () => {
    setLoginFlag(false);
  });

  const checkLoginInfo = () => {
    getLoginInfo().then((res) => {
      const { username, image } = res.data;
      setUserInfo({ username, image });
      setLoginFlag(true);
    }).catch((res) => {});
  };

  useEffect(() => {
    if (getUser()) {
      checkLoginInfo();
    }
  }, []);

  const userInfoOperateMenu = {
    showInfo: 'showUser',
    quitLogin: 'quitUser',
  };

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    childrenItem?: MenuItem[],
    style?: React.CSSProperties,
    type?: 'group',
  ): MenuItem => ({
    key,
    icon,
    children: childrenItem,
    label,
    type,
    style,
  } as MenuItem);

  const rightIcons: IconsProps[] = [{
    icon: <GithubOutlined className={cx('icon')} />,
    clickEvent: () => {
      window.open('https://github.com/ArisaTaki');
    },
    subTitle: 'About me',
  }, {
    icon: <FormOutlined className={cx('icon')} />,
    clickEvent: () => {
      console.log('???????????????icon');
    },
    subTitle: '?????????',
  }, {
    icon: <BellOutlined className={cx('icon')} />,
    clickEvent: () => {
      console.log('???????????????icon');
    },
    subTitle: '?????????',
  }];

  const items: MenuProps['items'] = [
    getItem('??????', routerPath.Home, <HomeOutlined />, undefined, { marginTop: 0 }),
    getItem('????????????', 'groupOne', <AppstoreOutlined />, [
      // TODO ????????????
      getItem('Item one', routerPath.testRoute),
    ]),
    // TODO ????????????
    getItem('?????????', routerPath.quitTestRoute, <QuestionCircleOutlined />),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    history.push(e.key);
  };

  const userInfoDropDownItems: MenuProps['items'] = [
    getItem('????????????', userInfoOperateMenu.showInfo, <UserOutlined />),
    getItem('??????', userInfoOperateMenu.quitLogin, <ImportOutlined />),
  ];

  const userInfoDropDownOnclick: MenuProps['onClick'] = (e) => {
    if (e.key === userInfoOperateMenu.showInfo) {
      console.log('????????????????????????');
    } else {
      deleteUser();
    }
  };

  const renderUserInfoDropDownMenu = () => (
    <Menu items={userInfoDropDownItems} onClick={userInfoDropDownOnclick} />
  );

  const renderUserInfoFunc = () => (
    <Dropdown overlay={renderUserInfoDropDownMenu} placement="top">
      <div className={cx('avatar')}>
        <Avatar
          className={cx('avatar-img')}
          src={userInfo?.image ?? 'https://s0.lgstatic.com/i/image6/M01/1F/6B/Cgp9HWBR1z2AB8UTAAG87bdA0lA648.jpg'}
        />
        <div className={cx('user-info')}>
          <div className={cx('name')}>
            Hi!
            {/* TODO ???????????? */}
            {userInfo?.username ?? 'eiko'}
          </div>
        </div>
      </div>
    </Dropdown>
  );

  const renderLoginModal = () => (
    // e.stopPropagation ???????????????
    <div className={cx('login-card')} onClick={(e) => { e.stopPropagation(); }}>
      <span>email</span>
      <Input
        autoComplete="new-password"
        placeholder="email"
        value={loginInfo?.email}
        onChange={(e) => {
          setLoginInfo({ ...loginInfo, email: e.target.value });
        }}
      />
      <span>password</span>
      <Space direction="vertical">
        { /* autoComplete="new-password"??????????????????????????? */ }
        <Input.Password
          autoComplete="new-password"
          value={loginInfo?.password}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
          placeholder="password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Space>
      <Button
        type="primary"
        className={cx('submit-button')}
        onClick={() => {
          Login({ user: loginInfo }).then((res) => {
            setLoginInfo(initLoginInputInfo);
            const { username, image, token } = res.data;
            saveUser({ username, image, token });
            setLoginFlag(true);
            setShowLoginModalFlag(false);
            setUserInfo({ username: res.data.username, image: res.data.image! });
          }).catch((err) => {
            message.warning(err.message);
          });
        }}
      >
        Login
      </Button>
    </div>
  );

  const renderHeaderRightIcon = (
    index: number,
    icon: React.ReactNode,
    clickEvent: () => void,
    subTitle: string,
  ) => (
    <div key={index} className={cx('control', 'control-icon-single')} onClick={clickEvent}>
      {icon}
      <span>{subTitle}</span>
    </div>
  );

  const renderLoginPartFunc = () => (
    <div
      className={cx('control')}
      onClick={() => setShowLoginModalFlag(!showLoginModalFlag)}
    >
      <span className={cx('login-button')}>
        login
      </span>
    </div>
  );

  const getSearchResult = () => {
    if (searchInfo) {
      console.log(searchInfo);
    }
  };

  return (
    <Layout className={cx('main')}>
      <Sider
        tabIndex={-1}
        onClick={() => { setShowLoginModalFlag(false); }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={cx('aside')}
      >
        <div className={cx('logo')}>
          <i />
          <span className={cx({ collapsed })}>EIKO FUN</span>
        </div>
        <Menu
          selectedKeys={[history.location.pathname]}
          onClick={onClick}
          defaultSelectedKeys={[routerPath.Home]}
          defaultOpenKeys={['groupOne']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header
          className={cx('site-layout-background', 'header')}
          style={{ padding: 0 }}
        >
          <div className={cx('header-left')}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: cx('trigger'),
              onClick: () => { setCollapsed(!collapsed); },
            })}
            <div className={cx('search-area')}>
              <Input
                onChange={(e) => {
                  setSearchInfo(e.target.value);
                }}
                placeholder="Search anything"
                className={cx('search')}
              />
              <span className={cx('search-icon')} onClick={getSearchResult} />
            </div>
          </div>
          <div className={cx('header-right')}>
            {rightIcons
              .map(
                (item,
                  index) => renderHeaderRightIcon(index, item.icon, item.clickEvent, item.subTitle),
              )}
            {loginFlag ? renderUserInfoFunc() : renderLoginPartFunc()}
          </div>
        </Header>
        <Content
          tabIndex={-1}
          onClick={() => { setShowLoginModalFlag(false); }}
          className={cx('site-layout-background')}
          style={{
            padding: '24px 24px 14px 24px',
            minHeight: 280,
            background: `url(${backGroundImage}) no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          {showLoginModalFlag ? renderLoginModal() : null}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
