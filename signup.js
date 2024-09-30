function validateForm(event) {
    event.preventDefault(); 
  
  
    var nameInput = document.getElementById('name').value;
    var passwordInput = document.getElementById('password').value;
    var confirmPasswordInput = document.getElementById('confirm-password').value;
    var birthdateInput = document.getElementById('birthdate').value;
    var genderInput = document.getElementById('gender').value;
    var termsInput = document.getElementById('terms').checked;
  
  
    if (nameInput.trim() === '') {
      alert('Nama harus diisi');
      return;
    }
  
    
    if (passwordInput.length < 6) {
      alert('Kata Sandi harus memiliki minimal 6 karakter');
      return;
    }
  
    
    if (passwordInput !== confirmPasswordInput) {
      alert('Konfirmasi Kata Sandi tidak cocok');
      return;
    }
  
    
    if (birthdateInput.trim() === '') {
      alert('Tanggal Lahir harus diisi');
      return;
    }
  
    
    if (genderInput === '') {
      alert('Jenis Kelamin harus dipilih');
      return;
    }
 
    if (!termsInput) {
      alert('Anda harus menyetujui Syarat dan Ketentuan');
      return;
    }
  
    
    var formData = {
      name: nameInput,
      password: passwordInput,
      birthdate: birthdateInput,
      gender: genderInput,
      terms: termsInput
    };

    console.log(formData);
  }
  