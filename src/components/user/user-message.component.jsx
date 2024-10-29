import './user-message.styles.scss';

const UserMessage = (props) => {
    const { message } = props;
    return (
        <div className={`user-message ${message !== '' ? 'filled': ''}`}>{message}</div>
    )
};

export default UserMessage;