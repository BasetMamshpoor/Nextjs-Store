import useGetPrivetRequest from 'hooks/useGetPrivetRequest';
import style from './Comments.module.css'

const Comments = () => {

    const [comments] = useGetPrivetRequest('/profile/comments')


    return (
        <>
            <div className={style.QaybTx}>
                {comments}
            </div>
        </>
    );
};

export default Comments;