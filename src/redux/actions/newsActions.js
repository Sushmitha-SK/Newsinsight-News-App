import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } from '../slice/newsSlice';
import { fetchNews } from '../../api/newsApi'

export const fetchNewsData = (category) => async (dispatch) => {
    try {
        dispatch(fetchNewsStart());
        const response = await fetchNews(category);
        dispatch(fetchNewsSuccess(response.data.articles));
    } catch (error) {
        dispatch(fetchNewsFailure(error.message));
    }
};
