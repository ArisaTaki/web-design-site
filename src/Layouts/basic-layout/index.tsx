import React, { ReactNode, useEffect, useState } from 'react';
import className from 'classnames/bind';
import {
  Avatar, Button, Input, Layout, Menu, MenuProps, Space,
} from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined, EyeTwoTone, EyeInvisibleOutlined, UserOutlined, FormOutlined, BellOutlined,
} from '@ant-design/icons';
import backGroundImage from '../../assets/amanohina.jpg';
import history from '@/utils/getHistory';
import styles from './styles.module.scss';
import { getUserInfoStore } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import { LoginInfo } from '@/services/entities';

const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;

export interface BasicLayoutProps {
  // eslint-disable-next-line react/no-unused-prop-types
  example?: string
}

type MenuItem = Required<MenuProps>['items'][number];

interface IconsProps {
  icon: React.ReactNode
  clickEvent: () => void
  subTitle: string
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loginFlag, setLoginFlag] = useState(false);
  const [showLoginModalFlag, setShowLoginModalFlag] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ username: '', password: '' });

  useEffect(() => {
    setUserInfo(getUserInfoStore());
    setLoginFlag(!!getUserInfoStore());
  }, []);

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
    icon: <UserOutlined className={cx('icon')} />,
    clickEvent: () => {
      console.log('点击了用户icon');
    },
    subTitle: 'About me',
  }, {
    icon: <FormOutlined className={cx('icon')} />,
    clickEvent: () => {
      console.log('点击了修改icon');
    },
    subTitle: '留言板',
  }, {
    icon: <BellOutlined className={cx('icon')} />,
    clickEvent: () => {
      console.log('点击了提醒icon');
    },
    subTitle: '新东西',
  }];

  const items: MenuProps['items'] = [
    getItem('首页', routerPath.Home, <HomeOutlined />, undefined, { marginTop: 0 }),
    getItem('测试分组', 'groupOne', <AppstoreOutlined />, [
      // TODO 测试路径
      getItem('Item one', routerPath.testRoute),
    ]),
    // TODO 路径待定
    getItem('关于咱', routerPath.quitTestRoute, <QuestionCircleOutlined />),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    history.push(e.key);
  };

  const renderUserInfoFunc = () => (
    <div className={cx('avatar')}>
      <Avatar
        className={cx('avatar-img')}
        src="https://s0.lgstatic.com/i/image6/M01/1F/6B/Cgp9HWBR1z2AB8UTAAG87bdA0lA648.jpg"
      />
      <div className={cx('user-info')}>
        <div className={cx('name')}>
          Hi!
          {/* TODO 用户信息 */}
          {userInfo ?? 'eiko'}
        </div>
      </div>
    </div>
  );

  const renderLoginModal = () => (
    // e.stopPropagation 是阻止冒泡
    <div className={cx('login-card')} onClick={(e) => { e.stopPropagation(); }}>
      <span>username</span>
      <Input
        placeholder="username or email"
        value={loginInfo?.username}
        onChange={(e) => {
          setLoginInfo({ ...loginInfo, username: e.target.value });
        }}
      />
      <span>password</span>
      <Space direction="vertical">
        { /* autoComplete="new-password"禁用浏览器自动填充 */ }
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
          console.log(loginInfo);
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
