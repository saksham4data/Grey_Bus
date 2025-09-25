
    // Edit photo -> open picker
    const editBtn = document.getElementById('editPhotoBtn');
    const fileInput = document.getElementById('fileInput');
    const previewImg = document.getElementById('previewImg');
    const photoBox = document.getElementById('photoBox');
    const toast = document.getElementById('toast');
    const form = document.getElementById('profileForm');

    editBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      previewImg.src = url;
      previewImg.onload = () => URL.revokeObjectURL(url);

      // Show image, hide silhouette behind it automatically
      previewImg.style.display = 'block';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      // console.log("[v0] Form data:", data);
      showToast('Profile saved successfully.');
    });

    function showToast(msg){
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    }
