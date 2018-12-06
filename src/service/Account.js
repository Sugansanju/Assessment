var oauthServerLocation= 'http://localhost:9088';
// var oauthServerLocation= 'https://test.examsdaily.in:9088';


export default {
  googleStatus: function(gtoken) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios
        .get("account/google/status/"+gtoken)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  googleRegister: function(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    return new Promise((resolve, reject) => {
      authAxios
        .post("account/google", data, config)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
faceBookStatus: function (ftoken) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios
        .get("demo/facebook/status/" + ftoken)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  faceBookRegister: function (data) {

    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    return new Promise((resolve, reject) => {
      authAxios
        .post("demo/facebook", data, config)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
    login(user) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
          });
      return new Promise((resolve, reject) => {
        authAxios({
          method: 'post',
          url: 'oauth/token',
          headers: {
            'Authorization': 'Basic ' + btoa("barClientIdPassword:password"),
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            'grant_type': 'password',
            'username': user.contact,
            'password': user.password
          }
        }).then((response) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
          // localStorage.setItem('isAuthenticated', true);
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
  },
  userLogin(user) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'oauth/token',
        headers: {
          'Authorization': 'Basic ' + btoa("barClientIdPassword:password"),
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          'grant_type': 'password',
          'username': user.contact,
          'password': user.password
        }
      }).then((response) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
        // localStorage.setItem('isAuthenticated', true);
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  register(data) {
      var authAxios = axios.create({
        baseURL: oauthServerLocation,
      });
      return new Promise((resolve, reject) => {
        authAxios({
          method: 'post',
          url: 'account/register',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            username: data.name,
            contact: data.contact,
            password: data.password
          },
        }).then((response) => {
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
  },

  userRegister(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });console.log("users",data)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'account/userRegister',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: data.username,
          contact: data.contact,
          firstName: data.firstName,
          lastName:data.lastName
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  bulkImport(dataItems) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'manage/user/register/bulk',
        headers: {
          'Content-Type': 'application/json',
        },
        data: dataItems,
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getAllUsers(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'manage/user/find/all',
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  activateUser(userId) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'manage/user/activate/'+userId,
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deactivateUser(userId) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'manage/user/deactivate/'+userId,
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteUser(userId) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'manage/user/delete/'+userId,
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
    getAccessToken(refreshToken) {
        var authAxios = axios.create({
            baseURL: oauthServerLocation,
          });
      return new Promise((resolve, reject) => {
        authAxios({
          method: 'post',
          url: 'oauth/token',
          headers: {
            'Authorization': 'Basic ' + btoa("barClientIdPassword:password"),
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            'grant_type': 'refresh_token',
            'client_id': 'barClientIdPassword',
            'refresh_token': refreshToken
          }
        }).then((response) => {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
          // console.log('The obtained access token after page refresh', response.data.access_token)
          // localStorage.setItem('isAuthenticated', true);
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  passwordReset(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'put',
        url: 'account/password/reset',
        data: {
          contact: data.contact,
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getContactByToken(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'account/password/reset?token='+data.token,
        // params: {
        //   token:data.token
        // }
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  changePassword(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'account/password/reset',
        data: {
          confirmationToken:data.token,
          password: data.password
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  nameUpdate(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    // console.log("Name Details",data)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'setting/profile',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId:data.userId,
          firstName: data.firstName,
          lastName: data.lastName
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  resetPassword(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    // console.log("password Details", data)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'setting/security',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: data.userId,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  contactUpdate(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    // console.log("password Details", data)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'setting/contact',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: data.userId,
         contact:data.contact
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getUserDetails(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    // let token = data.token;
    console.log("TOKEN IS", data.token);
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'account/tokenVerify?token=' + data.token,
        // params: {
        //   token:data.token
        // }
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  setPassword(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    console.log("datas", data.verificationToken)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'account/tokenVerify',
        data: {
          verificationToken: data.verificationToken,
          // contact: data.contact,
          // username: data.username,
          // firstName: data.firstName,
          // lastName: data.lastName,
          password: data.password
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getRank(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    // console.log("Rank Details", data)
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'test/rank',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          userId: data.userId,
          testId:data.testId
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  menuInsert(data) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    console.log(data);
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'post',
        url: 'menu/create',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          menuName: data.name,
        },
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  logout(accessToken) {
        var authAxios = axios.create({
          baseURL: oauthServerLocation,
          });
      return new Promise((resolve, reject) => {
        authAxios({
          method: 'post',
          url: 'oauth/token/revokeById/' + accessToken,
        }).then((response) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ';
          resolve(response);
        }).catch((err) => {
          reject(err);
        });
      });
    },

  }
