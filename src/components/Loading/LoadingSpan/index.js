import React from 'react';

import './index.less';

class LoadingSpan extends React.Component {
    render() {
        return (
            <span className="loading">
                <span className="iconfont icon-loading" />
                加载中
                <span className="loading-dot">...</span>
            </span>
        );
    }
}

export default LoadingSpan;
