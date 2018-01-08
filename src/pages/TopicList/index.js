import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { LoadingPage } from '@components/Loading';
import Error from '@components/Error';

import { getTopicLabel } from '@js/utils';

class TopicList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingPage: false,
            error: null,

            topicList: [],
        };
    }
    render() {
        const { loadingPage, error, topicList } = this.state;
        return (
            <div>
                {loadingPage ? <LoadingPage /> : ''}
                {error ? <Error error={error} /> : ''}
                {!loadingPage && !error ? (
                    <section>
                        <ul className="topicList" ref="topicList">
                            {topicList.map(topic => (
                                <li key={topic.id}>
                                    <Link className="topic" to={`/topic/${topic.id}/`}>
                                        <h3 className="title">
                                            <span
                                                className={`label ${topic.top ? 'top' : ''} ${
                                                    topic.good ? 'good' : ''
                                                } ${topic.tab}`}
                                            >
                                                {getTopicLabel(topic.top, topic.good, topic.tab)}
                                            </span>
                                            <span className="text">{topic.title}</span>
                                        </h3>
                                        <div className="content">
                                            <div className="left">
                                                <img
                                                    className="avatar"
                                                    src={topic.author.avatar_url}
                                                />
                                                <span className="texts">
                                                    <span className="name">
                                                        {topic.author.loginname}
                                                    </span>
                                                    <time className="create-at">
                                                        {topic.create_at | getTimeago}
                                                    </time>
                                                </span>
                                            </div>
                                            <div className="right">
                                                <span className="status">
                                                    <b className="reply-count">
                                                        {topic.reply_count}
                                                    </b>{' '}
                                                    / {topic.visit_count}
                                                </span>
                                                <time className="last-replay-at">
                                                    {topic.last_reply_at | getTimeago}
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

export default TopicList;
