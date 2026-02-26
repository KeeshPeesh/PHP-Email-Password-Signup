<?php
// ---------------------------
// Handle form submission (same as before)
$message = '';
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (strlen($username) < 3) {
        $message = "Username must be at least 3 characters.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $message = "Please enter a valid email address.";
    } elseif (strlen($password) < 6) {
        $message = "Password must be at least 6 characters.";
    } else {
        $line = "$username|$email|" . password_hash($password, PASSWORD_DEFAULT) . "\n";
        $saved = file_put_contents('users.txt', $line, FILE_APPEND | LOCK_EX);

        if ($saved !== false) {
            $success = true;
            $message = "Account created successfully! 🎉 (check users.txt)";
        } else {
            $message = "Could not save user. Server permission error?";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sign Up</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <div class="form-card">
    <h1>Create Account</h1>

    <?php if ($message): ?>
      <div class="alert <?= $success ? 'success' : 'error' ?>">
        <?= htmlspecialchars($message) ?>
      </div>
    <?php endif; ?>

    <form id="signupForm" method="post" novalidate>
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          autocomplete="username"
          value="<?= htmlspecialchars($username ?? '') ?>"
          required
        >
        <small class="error-msg"></small>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          autocomplete="email"
          value="<?= htmlspecialchars($email ?? '') ?>"
          required
        >
        <small class="error-msg"></small>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          autocomplete="new-password"
          required
        >
        <small class="error-msg"></small>

        <!-- Password requirements panel -->
        <div class="password-requirements" id="passwordReqs">
          <p>Password must contain:</p>
          <ul>
            <li data-rule="length">At least 6 characters</li>
            <li data-rule="uppercase">At least 1 uppercase letter</li>
            <li data-rule="lowercase">At least 1 lowercase letter</li>
            <li data-rule="number">At least 1 number</li>
            <li data-rule="special">At least 1 special character (!@#$%^&*)</li>
          </ul>
        </div>
      </div>

        <button type="submit" id="submitBtn">
        <span class="btn-text">Sign Up</span> 
        <span class="btn-spinner hidden"></span>
        </button>

      <p class="login-link">Already have an account? <a href="login.php">Log in</a></p>
    </form>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="gsap.js"></script>
<script src="script.js"></script>
</body>
</html>