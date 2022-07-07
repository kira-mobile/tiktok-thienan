import * as request from '~/utils/request';

// * https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouced)}&type=less
//* chuyển từ fetch() => axios()
// * Custom baseURL bằng request.js

export const search = async (q, type = 'less') => {
    try {
        const res = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
};
search();