import './ErrorMessage.scss';

function ErrorMessage() {
    return (
        <article className='error-message'>
            <p data-testid='error_msg' className='error-message__text'>Fill out all the fields and make sure that people and shoes is the same number.</p>
        </article>
    )
}

export default ErrorMessage;