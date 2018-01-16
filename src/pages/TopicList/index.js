import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { LoadingPage } from '@components/Loading';
import Error from '@components/Error';

import { getTopicLabel, getQuery, getTimeago } from '@js/utils';
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

        this.state = {
            initError: null,
        };

        this.init = this.init.bind(this);
    }
    componentWillMount() {
        this.init();
    }
    init(location = this.props.location) {
        const { fetchTopicListByTab } = this.props;
        try {
            fetchTopicListByTab(getQuery(location).tab);
        } catch (error) {
            this.setState(prevState => ({
                ...prevState,
                initError: error,
            }));
        }
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.init(nextProps.location);
            return false;
        }
        return true;
    }

    render() {
        const { initError } = this.state;
        const { topicList } = this.props;
        const isInit = !topicList.data.length;
        const isInitLoading = isInit && topicList.isFetching;
        const hasInitError = isInit && initError;
        return (
            <div>
                {isInitLoading ? <LoadingPage /> : ''}
                {hasInitError ? <Error error={initError} /> : ''}
                {!isInitLoading && !hasInitError ? (
                    <section>
                        <ul className="topic-list" ref="topicList">
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
                        </ul>
                    </section>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        topicList: state.topicList,
    };
};

export default connect(mapStateToProps, { fetchTopicListByTab, fetchNextPageTopicList })(TopicList);
