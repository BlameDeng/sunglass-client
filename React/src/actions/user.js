export const login = (user) => ({
    type: 'SET_USER',
    user
})

export const changeProfile = (nickyname, gender) => ({
    type: 'CHANGE_PROFILE',
    user: { nickyname, gender }
})