var SUPABASE_URL = 'https://vrmxttqpaaodgqjlwfwq.supabase.co';
var SUPABASE_KEY = 'sb_publishable_IZEstYDnwdE2-EonDD_uhg_rhq314BL';

function verifyLogin(studentId, password, callback) {
  fetch(SUPABASE_URL + '/rest/v1/students?select=id,password&id=eq.' + studentId, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    }
  })
  .then(function(res) {
    if (!res.ok) throw new Error('网络请求失败');
    return res.json();
  })
  .then(function(data) {
    if (!data || data.length === 0) {
      callback({ success: false, message: '座号不存在，请检查后重试' });
      return;
    }
    var user = data[0];
    if (user.password === password) {
      callback({ success: true, message: '登录成功' });
    } else {
      callback({ success: false, message: '口令错误，请重新输入' });
    }
  })
  .catch(function(err) {
    console.error(err);
    callback({ success: false, message: '验证失败，请检查网络后重试' });
  });
}
