import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import style from './Comments.module.css'

const Comments = () => {

    const [comments] = useGetPrivatRequest('/profile/comments')


    return (
        <>
            <div className={style.QaybTx}>
                {comments}
            </div>
        </>
    );
};

export default Comments;