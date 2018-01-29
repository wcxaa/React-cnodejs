import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTopic } from '@store/topic';
import { Link } from 'react-router-dom';
import PageLoader from '@components/PageLoader';

import { getTopicLabel, getTimeago } from '@js/utils';
import './index.less';

class Topic extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        fetchTopic: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchTopic, match, topic } = this.props;

        fetchTopic(match.params.id);
    }
    render() {
        const { topic } = this.props;

        return (
            <PageLoader state={topic}>
                {Object.keys(topic).length > 2 ? (
                    <div>
                        <div className="topic">
                            <h2 className="topic-title">{topic.title}</h2>
                            <div className="topic-info">
                                <div className="topic-left">
                                    <Link to="/user" className="topic-link">
                                        <img
                                            className="topic-avatar"
                                            src={topic.author.avatar_url}
                                        />
                                    </Link>
                                    <span className="topic-texts">
                                        <span className="topic-name">{topic.author.loginname}</span>
                                        <time className="topic-create-at">
                                            发布于:{getTimeago(topic.create_at)}
                                        </time>
                                    </span>
                                </div>
                                <div className="topic-right">
                                    <span
                                        className={`topic-label ${topic.top ? 'top' : ''} ${
                                            topic.good ? 'good' : ''
                                        } ${topic.tab}`}
                                    >
                                        {getTopicLabel(topic.top, topic.good, topic.tab)}
                                    </span>
                                    <span className="topic-visit-count">
                                        {topic.visit_count}次浏览
                                    </span>
                                </div>
                            </div>
                            <div
                                className="topic-content markdown-body"
                                dangerouslySetInnerHTML={{ __html: topic.content }}
                            />
                        </div>
                        <section className="section-reply">
                            <h3 className="title">
                                <b className="reply-count">{topic.reply_count}</b> 回复
                            </h3>
                            <ul className="reply-list">
                                {topic.replies.map(reply => (
                                    <li className="reply" key={reply.id}>
                                        <div className="info">
                                            <span className="left">
                                                <Link
                                                    className="avatar-link"
                                                    to={`/user?loginname=${reply.author.loginname}`}
                                                >
                                                    <img
                                                        className="avatar"
                                                        src={reply.author.avatar_url}
                                                    />
                                                </Link>
                                                <span className="text">
                                                    {reply.author.loginname} 发布于：<br />
                                                    {getTimeago(reply.create_at)}
                                                </span>
                                            </span>
                                            <span className="right">
                                                <span className="iconfont icon-good" />
                                                <span className="up-count">{reply.ups.length}</span>
                                                <span className="iconfont icon-reply" />
                                            </span>
                                        </div>
                                        <div
                                            className="content markdown-body"
                                            dangerouslySetInnerHTML={{ __html: reply.content }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                ) : (
                    ''
                )}
            </PageLoader>
        );
    }
}

const mapStateToProps = state => {
    return {
        topic: state.topic,
    };
};

export default connect(mapStateToProps, { fetchTopic })(Topic);
