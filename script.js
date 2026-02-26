document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  const inputs = form.querySelectorAll('input[required]');
  const passwordInput = document.getElementById('password');
  const reqContainer = document.getElementById('passwordReqs');

  // ─── Real-time field validation (username, email, etc.) ───
  inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur',   () => validateField(input));
  });

  // ─── Password requirements real-time checker ───
  if (passwordInput && reqContainer) {
    passwordInput.addEventListener('input', updatePasswordRequirements);
  }

  form.addEventListener('submit', e => {
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) isValid = false;
    });

    // Extra check: all password rules should be met before submit
    if (passwordInput && !allPasswordRulesMet()) {
      isValid = false;
      updatePasswordRequirements(); // force show issues
    }

    if (!isValid) {
      e.preventDefault();
    }
  });

  function validateField(input) {
    const errorElement = input.nextElementSibling;
    let isValid = true;
    let message = '';

    if (input.validity.valueMissing) {
      message = 'This field is required';
      isValid = false;
    } 
    else if (input.type === 'email' && !input.validity.valid) {
      message = 'Please enter a valid email';
      isValid = false;
    } 
    else if (input.type === 'text' && input.value.trim().length < 3) {
      message = 'Must be at least 3 characters';
      isValid = false;
    } 
    else if (input.type === 'password' && input.value.length < 6) {
      message = 'Password must be at least 6 characters';
      isValid = false;
    }

    errorElement.textContent = message;
    input.style.borderColor = isValid ? '#e2e8f0' : '#e53e3e';

    return isValid;
  }

  function updatePasswordRequirements() {
    const value = passwordInput.value;

    const rules = {
      length:    value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number:    /[0-9]/.test(value),
      special:   /[!@#$%^&*(),.?":{}|<>]/.test(value)
    };

    reqContainer.querySelectorAll('li').forEach(li => {
      const rule = li.getAttribute('data-rule');
      if (rules[rule]) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  function allPasswordRulesMet() {
    const value = passwordInput.value;
    return (
      value.length >= 6 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value)
    );
  }
});

