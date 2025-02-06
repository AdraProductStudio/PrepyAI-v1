  
export const storeUserEmailID = (emailID) => {
    localStorage.setItem("userEmailID", emailID);
};

export const storeUserData = (gmailToken) => {
  localStorage.setItem("gmailAuthToken",gmailToken)
} 

export const getUserData = () => {
  return localStorage.getItem("gmailAuthToken")
}
  
export const getUserEmailID = () => {
    return localStorage.getItem("userEmailID");
};

export const storeUserAPIToken = (token) => {
  localStorage.setItem("userAPIToken", token)
}

export const getUserAPIToken = () => {
   return localStorage.getItem("userAPIToken")
}

export const storeBookName = (bookName) => {
  localStorage.setItem("bookName", bookName)
}

export const getBook = () => {
  return localStorage.getItem("bookName")
}

export const storeTitleName = (titleName) => {
  localStorage.setItem("titleName", titleName)
}

export const getTitleName = () => {
  return localStorage.getItem("titleName")
}

export const removeTitleName = () =>{
  localStorage.removeItem("titleName")
} 

export const removeUserDatas = () => {
  localStorage.removeItem("userEmailID")
  localStorage.removeItem("gmailAuthToken")
  localStorage.removeItem("userAPIToken")
  localStorage.removeItem("bookName")
  localStorage.removeItem("titleName")
}