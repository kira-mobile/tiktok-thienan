import * as httpRequest from '~/utils/httpRequest';

// * https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debouced)}&type=less
//* chuyển từ fetch() => axios()
// * Custom baseURL bằng httpRequest.js

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
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