var oauthServerLocation= 'http://localhost:9088';
// var oauthServerLocation= 'https://test.examsdaily.in:9088';


export default {
    onPageRefresh (session, router) {
        return new Promise((resolve, reject) => {
            if (session.exists("refresh_token")) {
            this.getAccessToken(session.get("refresh_token"))
                .then((response) => {
                // console.log(response);
                session.set("access_token", response.data.access_token);
                session.set("refresh_token", response.data.refresh_token);
                resolve(response);
                })
                .catch((err) => {
                session.clear();
                session.destroy();
                location.reload();
                console.log(err);
                reject(err);
                });
            }
        });
    },
    getAndLoadImage: function(session){
      // var hostname;
      // var url=session.get('current_user').avatar;

      // if (url.indexOf("//") > -1) {
      //     hostname = url.split('/')[2];
      // } else {
      //     hostname = url.split('/')[0];
      // }
      // hostname = hostname.split(':')[0];
      // hostname = hostname.split('?')[0];


      // console.log('Host Name',hostname );
      // var baseUrl = 'https://'+hostname;
      var authAxios = axios.create({
        // baseURL: url===hostname?oauthServerLocation: baseUrl,
        baseUrl : oauthServerLocation,
      });
      // console.log('Google Token', gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token);
      return new Promise((resolve, reject) => {
        authAxios({
          method: 'get',
          // url:  url===hostname?'uploads/avatars/' + session.get('current_user').avatar:url.substring(baseUrl.length, url.length),
          url: 'https://www.googleapis.com/plus/v1/people/me/',
          responseType: 'arraybuffer',
          // headers: {
          //   'Content-type': 'image/jpeg'
          // },
          headers: {
            'Authorization' :'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
          },
        }).then((response) => {
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );

          let imageData =  'data:'+response.headers['content-type'].toLowerCase()+';base64,'+base64;
          session.set('avatar', imageData );

          resolve(response);
        }).catch((err) => {
          console.log(err);
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
            resolve(response);
            }).catch((err) => {
            reject(err);
            });
        });
},
  getUserInfo(session) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
      // let email = contact.email;
    // console.log(email);
    return new Promise((resolve, reject) => {
      authAxios({
        method: 'get',
        url: 'manage/user/find/' + session.get("contact"),
      }).then((response) => {
        session.set('current_user', response.data);
        // if(session.get('current_user')!=null)
        //   if(session.get('current_user').avatar!=null)
        //     this.getAndLoadImage(session);
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  uploadImage: function(file, userId) {
    var authAxios = axios.create({
      baseURL: oauthServerLocation,
    });
    let formData = new FormData();
    //  let userId = this.$session.get("current_user").id;
    formData.append("file",file[0]);
    return new Promise((resolve, reject) => {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      };
      authAxios
        .post("setting/uploadImage/"+userId, formData,config)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
