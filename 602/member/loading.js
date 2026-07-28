const SUPABASE_URL = 'https://vrmxttqpaaodgqjlwfwq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IZEstYDnwdE2-EonDD_uhg_rhq314BL';

async function loadStudents() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/students?select=*&order=id.asc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    document.getElementById('studentList').innerHTML = '<div style="text-align:center;padding:30px;color:#999;">加载失败，请刷新重试</div>';
  }
}

function renderStudents(students) {
  const list = document.getElementById('studentList');
  if (!students || students.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:30px;color:#999;">暂无数据</div>';
    return;
  }
  let html = '';
  students.forEach(s => {
    const genderClass = s.gender === 'male' ? 'male' : 'female';
    const genderLabel = s.gender === 'male' ? '男' : '女';
    let badges = '';
    if (s.badge && s.badge.length > 0) {
      s.badge.forEach(b => {
        badges += `<span class="badge"><img src="https://aiyou945.github.io/602/member/crafting_table.png">${b}</span>`;
      });
    }
    let nicknames = '';
    if (s.nickname && s.nickname.length > 0) {
      s.nickname.forEach(n => {
        nicknames += `<span class="nickname-tag"><img src="https://aiyou945.github.io/602/member/nametag.png">外号：${n}</span>`;
      });
    }
    let feature = s.feature ? `<span class="feature-tag">${s.feature}</span>` : '';
    let remark = s.remark ? `<span class="remark-tag">${s.remark}</span>` : '';
    let idDisplay = s.id === 999 ? '旧 23 号：' : `${s.id} 号：`;
    html += `
      <div class="student-item">
        <span class="gender ${genderClass}">${genderLabel}</span>
        <div class="main-info">
          <span class="name"><strong>${idDisplay}</strong>${s.name}</span>
          ${badges}${nicknames}${feature}${remark}
        </div>
      </div>
    `;
  });
  list.innerHTML = html;
}

loadStudents();
