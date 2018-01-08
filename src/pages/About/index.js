import React from 'react';

import './index.less';

class About extends React.Component {
    render() {
        return (
            <div className="about">
                <ul className="about-info-list">
                    <li className="about-item">
                        <h3 className="about-title">关于项目</h3>
                        <p className="about-details">
                            该项目是把
                            <a
                                className="about-link"
                                href="https://github.com/wcxaa/Vue-cnodejs-wcx"
                            >
                                Vue-cnodejs-wcx
                            </a>
                            这个项目用React重写了一遍。它基于CNode的API，使用了webpack, react,
                            react-router, redux等技术。
                        </p>
                    </li>
                    <li className="about-item">
                        <h3 className="about-title">源码地址</h3>
                        <p className="about-details">
                            <a className="about-link" href="https://github.com/wcxaa/React-cnodejs">
                                https://github.com/wcxaa/React-cnodejs
                            </a>
                        </p>
                    </li>
                    <li className="about-item">
                        <h3 className="about-title">意见反馈</h3>
                        <p className="about-details">
                            <a
                                className="about-link"
                                href="https://github.com/wcxaa/React-cnodejs/issues"
                            >
                                发表意见或者提需求
                            </a>
                        </p>
                    </li>
                    <li className="about-item">
                        <h3 className="about-title">当前版本</h3>
                        <p className="about-details">V1.0</p>
                    </li>
                </ul>
            </div>
        );
    }
}

export default About;
