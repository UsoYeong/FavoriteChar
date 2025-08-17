// Theme toggle with persistence
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.body.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const now = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', now);
  localStorage.setItem('theme', now);
  themeBtn.setAttribute('aria-pressed', now === 'dark' ? 'false' : 'true');
});

// Copy content
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
  const text = `메지로 맥퀸 (Mejiro McQueen)\n- 생일: 4월 3일\n- 키: 159 cm\n- 체중: 조금 증가(조금만)\n- 쓰리사이즈: B71/W54/H76\n- 소속: 트레이센 학원·메지로 가문\n- CV: 오오니시 사오리\n- 특징: 우아한 명문가 아가씨, 장거리 특화 스테이어, 허당미, 식탐(체중 신경)\n- 실존마: 킷카쇼, 텐노쇼(봄) 2연패 등 장거리에서 활약`;
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = '복사됨!';
    setTimeout(() => (copyBtn.textContent = '복사'), 1500);
  } catch (e) {
    alert('복사 실패: 브라우저 권한을 확인해주세요.');
  }
});

// Detail sheet
const sheet = document.getElementById('sheet');
document.getElementById('moreBtn').addEventListener('click', () => sheet.showModal());
document.getElementById('closeSheet').addEventListener('click', () => sheet.close());

// Upload portrait
const fileInput = document.getElementById('fileInput');
const portraitImg = document.getElementById('portraitImg');
const avatarFallback = document.getElementById('avatarFallback');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    portraitImg.src = reader.result;
    portraitImg.style.display = 'block';
    avatarFallback.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

// Share
const shareBtn = document.getElementById('shareBtn');
shareBtn.addEventListener('click', async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: '메지로 맥퀸 프로필 카드', text: '우마무스메 메지로 맥퀸 프로필', url: location.href });
    } else {
      await navigator.clipboard.writeText(location.href);
      shareBtn.textContent = '링크 복사됨!';
      setTimeout(() => (shareBtn.textContent = '공유'), 1500);
    }
  } catch (e) {
    console.warn('Share cancelled or failed', e);
  }
});

// Subtle 3D tilt
const card = document.getElementById('card');
let rect;
function tilt(e){
  rect = rect || card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  const rx = (0.5 - y) * 6; // rotateX
  const ry = (x - 0.5) * 8; // rotateY
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
}
function resetTilt(){ card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; rect = null; }
card.addEventListener('pointermove', tilt);
card.addEventListener('pointerleave', resetTilt);
