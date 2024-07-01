
export const getAuthToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'));
    return userInfo ? userInfo.authToken : null;
};

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userinfo'));
};


export const checkValidToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('userinfo'));
    if (!userInfo || !userInfo.authToken) {
        return false;
    }
    return true;
};


export const saveUserInfo = (user,authToken) =>  {
    const userInfo = { user,authToken};
    localStorage.setItem('userinfo',JSON.stringify(userInfo));
};

export const  removeUserInfo = () =>{
    localStorage.removeItem('userinfo');
}