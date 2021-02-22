import React from 'react';
import { Link , NavLink } from 'react-router-dom';

const Menu = () => {

    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>   {/* 리엑트 라우터에서 <link> 컴포넌트를 통해서 SPA적인 페이지 접근이 가능하다 */}
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about/foo">About Foo</Link></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li> {/*<NavLink> 컴포넌트는 특정 경로일때 스타일 컴포넌트를 가능하다 */}
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;