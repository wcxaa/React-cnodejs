import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLoader from '@components/PageLoader';
import { LoadingSpan } from '@components/Loading';

import { getTopicLabel, getQuery, getTimeago, throttle } from '@js/utils';
import { fetchTopicListByTab, fetchNextPageTopicList } from '@store/topicList';

import './index.less';

class TopicList extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        fetchTopicListByTab: PropTypes.func.isRequired,
        fetchNextPageTopicList: PropTypes.func.isRequired,
        tap: PropTypes.string,
        topicList: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);

        this.isInit = true;
        this.init = this.init.bind(this);
        this.scroll = this.scroll.bind(this);
    }
    componentWillMount() {
        this.init();
    }
    componentDidMount() {
        window.addEventListener('scroll', throttle(this.scroll, 150, 300));
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.init(nextProps.location);
            return false;
        }

        return true;
    }
    init(location = this.props.location) {
        const { fetchTopicListByTab } = this.props;
        fetchTopicListByTab(getQuery(location).tab);
    }
    scroll(e) {
        const valid =
            this.$loading &&
            this.$loading.getBoundingClientRect().bottom <= document.documentElement.clientHeight;

        if (valid) {
            this.isInit = false;
            this.props.fetchNextPageTopicList();
        }
    }
    render() {
        const { topicList } = this.props;
        return (
            <PageLoader state={topicList} isInit={this.isInit}>
                {
                    <section>
                        <ul className="topic-list">
                            {topicList.data.map(topic => (
                                <li key={topic.id}>
                                    <Link className="topic-list-item" to={`/topic/${topic.id}/`}>
                                        <h3 className="topic-list-item-title">
                                            <span
                                                className={`topic-list-item-label ${
                                                    topic.top ? 'top' : ''
                                                } ${topic.good ? 'good' : ''} ${topic.tab}`}
                                            >
                                                {getTopicLabel(topic.top, topic.good, topic.tab)}
                                            </span>
                                            <span className="topic-list-item-text">
                                                {topic.title}
                                            </span>
                                        </h3>
                                        <div className="topic-list-item-content">
                                            <div className="topic-list-item-left">
                                                <img
                                                    className="topic-list-item-avatar"
                                                    src={topic.author.avatar_url}
                                                />
                                                <span className="topic-list-item-texts">
                                                    <span className="topic-list-item-name">
                                                        {topic.author.loginname}
                                                    </span>
                                                    <time className="topic-list-item-create-at">
                                                        {getTimeago(topic.create_at)}
                                                    </time>
                                                </span>
                                            </div>
                                            <div className="topic-list-item-right">
                                                <span className="topic-list-item-status">
                                                    <b className="topic-list-item-reply-count">
                                                        {topic.reply_count}
                                                    </b>{' '}
                                                    / {topic.visit_count}
                                                </span>
                                                <time className="topic-list-item-last-replay-at">
                                                    {getTimeago(topic.last_reply_at)}
                                                </time>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            <div className="loading-span-wrap" ref={ele => (this.$loading = ele)}>
                                <LoadingSpan />
                            </div>
                        </ul>
                    </section>
                }
            </PageLoader>
        );
    }
}

const mapStateToProps = state => {
    return {
        topicList: state.topicList,
    };
};

export default connect(mapStateToProps, { fetchTopicListByTab, fetchNextPageTopicList })(TopicList);
